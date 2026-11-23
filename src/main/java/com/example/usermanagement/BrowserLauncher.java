
package com.example.usermanagement;

import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

@Component
public class BrowserLauncher {

    @EventListener(ApplicationReadyEvent.class)
    public void openBrowser() {
        try {
            new ProcessBuilder(
                "cmd", "/c", "start", "",
                "http://localhost:8083/"
            ).start();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
