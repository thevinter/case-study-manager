"use client";

import { useState, useEffect, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import dynamic from "next/dynamic";
import "@uiw/react-md-editor/markdown-editor.css";
import { useAppContext } from "@/lib/store/context";
import { ensureHeadingIds } from "@/lib/markdown/headings";
import { remarkHeadingId } from "@/lib/markdown/remark-heading-id";
import remarkGfm from "remark-gfm";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

export default function CaseStudyPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { state, dispatch } = useAppContext();
  const [content, setContent] = useState(state.caseStudy?.content || "");
  const [isSaving, setIsSaving] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);
  const saveTimeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (state.caseStudy?.content) {
      setContent(state.caseStudy.content);
    }
  }, [state.caseStudy?.content]);

  useEffect(() => {
    const anchor = searchParams.get("anchor");
    if (anchor && previewRef.current) {
      setTimeout(() => {
        const previewContainer =
          previewRef.current?.querySelector(".wmde-markdown");
        const element =
          previewContainer?.querySelector(`[id="${anchor}"]`) ||
          previewRef.current?.querySelector(`[id="${anchor}"]`);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
          element.classList.add("highlight-heading");
          setTimeout(() => {
            element.classList.remove("highlight-heading");
          }, 2000);
        }
      }, 1000);
    }
  }, [searchParams, content]);

  const handleContentChange = (value?: string) => {
    const newContent = value || "";
    setContent(newContent);

    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    saveTimeoutRef.current = setTimeout(() => {
      setIsSaving(true);
      const { content: updatedContent, headingIndex } =
        ensureHeadingIds(newContent);
      dispatch({
        type: "UPDATE_CASE_STUDY",
        payload: {
          content: updatedContent,
          headingIndex,
        },
      });
      setContent(updatedContent);
      setIsSaving(false);
    }, 1000);
  };

  useEffect(() => {
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <style jsx global>{`
        .highlight-heading {
          background-color: #fef3c7 !important;
          transition: background-color 2s ease-out;
        }
        .w-md-editor-text-pre > code,
        .w-md-editor-text-input {
          font-size: 14px !important;
        }
        .w-md-editor {
          height: calc(100vh - 200px) !important;
        }
      `}</style>
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Case Study Editor
              </h1>
              {isSaving && (
                <p className="text-sm text-gray-500 mt-1">Saving...</p>
              )}
            </div>
            <nav className="flex gap-4">
              <Link
                href="/"
                className="text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded px-3 py-1"
              >
                Dashboard
              </Link>
              <Link
                href="/sections"
                className="text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded px-3 py-1"
              >
                Sections
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div ref={previewRef}>
            <MDEditor
              value={content}
              onChange={handleContentChange}
              previewOptions={{
                rehypePlugins: [
                  [
                    rehypeAutolinkHeadings,
                    {
                      behavior: "wrap",
                      properties: {
                        className: ["anchor-link"],
                      },
                    },
                  ],
                ],
                remarkPlugins: [remarkGfm, remarkHeadingId],
              }}
              data-color-mode="light"
            />
          </div>
        </div>
      </main>
    </div>
  );
}
