// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::{Manager, SystemTray, SystemTrayEvent, SystemTrayMenu, };
use tauri_plugin_positioner::{Position, WindowExt};

fn main() {
    let system_tray_menu = SystemTrayMenu::new();
    tauri::Builder::default()
        // .enable_macos_default_menu(false) // NOT QUITE
        .menu(Menu::with_items([
          MenuEntry::Submenu(Submenu::new(
            "File",
            Menu::with_items([
                MenuItem::CloseWindow.into(),
                #[cfg(target_os = "macos")]
                CustomMenuItem::new("hello", "Hello").into(),
            ]),
          )),
        ]));
        .plugin(tauri_plugin_positioner::init())
        .system_tray(SystemTray::new().with_menu(system_tray_menu))
        .on_system_tray_event(|app, event| {
            tauri_plugin_positioner::on_tray_event(app, &event);
            match event {
                SystemTrayEvent::LeftClick {
                    position: _,
                    size: _,
                    ..
                } => {
                    let window = app.get_window("main").unwrap();
                    // use TrayCenter as initial window position
                    let _ = window.move_window(Position::TrayCenter);
                    if window.is_visible().unwrap() {
                        window.hide().unwrap();
                    } else {
                        window.show().unwrap();
                        window.set_focus().unwrap();
                    }
                }
                _ => {}
            }
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
