# Functional requirements:

## General

- The app should be a mix between a to-do list and a roadmap
- There should be a #Dashboard that shows the current progress
- The roadmap should have #Sections based on the case study

## Dashboard

- The dashboard should show the current progress
- The dashboard should show the next step that needs to be taken
- The dashboard should show an overview of the sections, objectives and deliverables
- The dashboard should clearly show what steps are missing
- The dashboard should visualize the data in a way that is easy to understand

## Sections

- Each section should have a page with the following content:
- The name of the section
- The description of the section with the key points that lead to the objectives we want to achieve
- An interactive list of #Objectives
- Optionally, if the section warrants it: an interactive list of deliverables (no need to allow the user to upload files, just mark them as completed/not-completed)
- The sections should be creatable, editable and deletable
- The structure of the sections will probably be different between sections. Do not try to force a single structure for all the sections.
- Create specific custom components for each section if needed.

## Objectives

- The objectives should be domain specific and targeted to the section
- Most of the objectives will consist in a question that should be answered in a form
- Most of the forms will be just a text area. But some will be more complex.
- If an objective has measurable outcomes, the form should allow the user to input the data in numerical form
- If the outcomes are a derived value from the input, the derived value should be calculated automatically
- The objectives should be markable as completed/not-completed

## Misc

- The app will be used by a single user so there's no need for authentication
- The app will be used only on desktop

# Technical requirements

- The app should be built with NextJS
- The app should save progress in the browser's local storage
