# Setting up Visual Studio Code for Web Development

## Introduction
The first step to getting started with web development is setting up an IDE (Integrated Development Environment). IDEs are used to write and test code. The benefits of using an IDE over a regular text editors like notepad include syntax highlighting, autocomplete, and many features brought by extensions.

The most used IDE today is Visual Studio Code. It is a free IDE with support for many languages. It is developed by Microsoft and the open-source community as a more lightweight and general version of Visual Studio, which is another IDE developed by Microsoft.

This article will explain how to install Visual Studio Code and set it up for web development. I will also recommend some extensions that will make it easier to develop websites in VSCode.

## Installation
1. Download [Visual Studio Code](https://code.visualstudio.com/)
2. Run the installer
3. Open Visual Studio Code

## Creating a project
In order to create website, you first have to have a folder to store all files in. To create a folder, select `File->Open Folder` from the top bar. Then create and open a folder in your desired location using your operating systems native GUI.

When you have opened a folder you will be greeted with a mostly blank screen. To start creating your site, you will have to create a file. To do so head over to the explorer view by pressing the paper sheet icon on the side bar, or pressing `Ctrl+Shift+E`.

Here you can create a file by hovering over the project name at the top of the explorer, and clicking the new file icon. This will prompt you to name the file. The file name should be something ending with `.html`.

To get a basic template for your site, type in "doc" in the newly opened editor, and press `Enter`. This is called a "snippet" and can be used to automate many tasks when developing.

## Extensions
Before you get started with developing, there are some extensions you should install. An extension is a add-on to Visual Studio Code, often developed by other Visual Studio code users. Extensions can add language support, new features, themes, and much more.

To install extensions, head over to the extensions tab in Visual Studio Code by clicking the icon with four boxes on the sidebar, or pressing `Ctrl+Shift+X`.

There are of course many more great extensions than the ones listed here. These are just the extensions that are a must have for any web developer in my opinion.

### Live Server
Live Server is an extension developed by Ritwick Dey. It allows you to start a web server from Visual Studio Code. It also hot reloads (reloads on code change) which leads to a smoother development experience, especially on a multi monitor setup. 

To start a web server, right click the html file you want to open in the explorer view. Then click "Open with Live Server". You should now be able to access your site on [localhost:5050](localhost:5050) in your browser.

### Prettier
Prettier is used to format your code, which in turn makes your code easier to read on consistent throughout the project.

To automatically run Prettier when you save your code, you need to enable "Format On Save" in the Visual Studio Code settings. To do this, click the cog icon in the bottom left of Visual Studio Code. Then search for "Format On Save" in the search bar. Enable the setting, and you're good to go!

### vscode-icons
vscode-icons is an extension that completely overhauls the icons in the explorer view. This makes navigating and finding files in the explorer much easier.

When installed, you will be asked to choose your preferred icon scheme. Select vscode-icons from the list.