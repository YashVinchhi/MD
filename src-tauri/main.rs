#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use std::process::Command;
use std::{thread, time};
use tauri::Manager;

fn main() {
    // Start the server binary in the background
    let _child = Command::new("bin/server.exe-x86_64-pc-windows-msvc.exe")
        .spawn()
        .expect("Failed to start server binary");

    // Optionally, wait a bit to let the server start
    thread::sleep(time::Duration::from_secs(2));

    tauri::Builder::default()
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
