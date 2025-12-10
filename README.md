# MarkFlow

MarkFlow is a modern markdown editor built with Tauri and Next.js. It provides a seamless and efficient way to create, edit, and preview markdown files with additional features like Mermaid diagrams and customizable themes.

---

## 🌟 Features

- **Markdown Editing**: Write and edit markdown files with a live preview.
- **Mermaid Diagrams**: Create and render diagrams directly in your markdown.
- **Customizable Themes**: Switch between light and dark themes.
- **Cross-Platform**: Build and run on Windows, macOS, and Linux.
- **Tauri Integration**: Lightweight and secure desktop application.
- **State Management**: Powered by Zustand for efficient state handling.

---

## 🛠️ Installation

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or higher)
- [Rust](https://www.rust-lang.org/) (stable toolchain)
- [Tauri CLI](https://tauri.app/v1/guides/getting-started/prerequisites)

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/YashVinchhi/MD.git
   cd MD
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Build the application:
   ```bash
   npm run tauri build
   ```

---

## 🏗️ Project Architecture

MarkFlow is designed with a modular and scalable architecture. Below is an overview of the project's structure:

### **Frontend**
- **Framework**: [Next.js](https://nextjs.org/) for server-side rendering and static site generation.
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) for utility-first styling.
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/) for managing application state.
- **Components**: Reusable UI components built with Radix UI primitives.

### **Backend**
- **Tauri**: Provides the backend for the desktop application, leveraging Rust for performance and security.
- **File System Access**: Tauri's `fs` API is used for reading and writing markdown files.
- **Dialog Management**: Tauri's `dialog` API is used for file selection and saving.

### **Directory Structure**
```
MD/
├── src/                     # Frontend code
│   ├── app/                # Next.js pages and layouts
│   ├── components/         # Reusable React components
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility functions
│   └── store/              # Zustand state management
├── src-tauri/              # Tauri-specific code
│   ├── src/                # Rust source files
│   ├── icons/              # Application icons
│   ├── Cargo.toml          # Rust dependencies
│   └── tauri.conf.json     # Tauri configuration
├── public/                 # Static assets
├── .github/workflows/      # GitHub Actions workflows
└── README.md               # Project documentation
```

---

## 📜 Configuration

### Tauri Configuration
The `src-tauri/tauri.conf.json` file contains the configuration for the Tauri application. Key settings include:

- **`build`**: Commands to run before building the application.
- **`bundle`**: Settings for packaging the application, including icons and metadata.
- **`allowlist`**: APIs enabled for the application, such as `fs` and `dialog`.

---

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Submit a pull request with a detailed description of your changes.

---

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- [Tauri](https://tauri.app/)
- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Radix UI](https://www.radix-ui.com/)
- [Zustand](https://zustand-demo.pmnd.rs/)

---

## 📷 Screenshots

### Markdown Editor
![Markdown Editor](https://via.placeholder.com/800x400?text=Markdown+Editor)

### Mermaid Diagrams
![Mermaid Diagrams](https://via.placeholder.com/800x400?text=Mermaid+Diagrams)

---

## 📧 Contact

For any inquiries, please contact [Yash Vinchhi](mailto:yash@example.com).