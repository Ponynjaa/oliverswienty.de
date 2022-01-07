"use strict";

let themeToggle;
let header;

$(document).ready(() => {
    console.log("was guckst du");
    header = $("#header");
    themeToggle = $("#theme-toggle");
    setThemePreference();
    themeToggle.click(() => {
        const isLight = document.body.classList.contains("light-theme");
        document.cookie = `dark=${isLight}; path=/; SameSite=Lax`;
        isLight ? enableDarkMode() : enableLightMode();
    });

    typing();
});

function typing() {
    new TypeIt(".typing", {
        speed: 100,
        loop: true,
    })
    .pause(2000)
    .delete("Oliver.".length)
    .pause(500)
    .type("Anwendungsentwickler.")
    .pause(2000)
    .go();
}

function enableDarkMode() {
    header.removeClass("bg-white");
    header.addClass("bg-dark");
    document.body.classList.remove("light-theme");
    document.body.classList.add("dark-theme");
    themeToggle.attr("aria-label", "Switch to light theme");
}

function enableLightMode() {
    header.removeClass("bg-dark");
    header.addClass("bg-white");
    document.body.classList.remove("dark-theme");
    document.body.classList.add("light-theme");
    themeToggle.attr("aria-label", "Switch to dark theme");
}

function setThemePreference() {
    const cookie = document.cookie.split(";")?.find(row => row.includes("dark="));
    if (!cookie) return useMediaQuery();
    const prefersDark = cookie.split("=")[1];
    prefersDark === "true" ? enableDarkMode() : enableLightMode();
}

function useMediaQuery() {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) return enableDarkMode();
    enableLightMode();
}
