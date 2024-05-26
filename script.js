function tryToRedirectToRightLanguage(languagePrefix) {
    if (isCustomDomain()) {
        const cookies = getCookieObject();
        var lastLanguage = languagePrefix;
        if (!lastLanguage) {
            lastLanguage = getLastLanguageFromCookies(cookies);
        }
        var languagesObj = JSON.parse(window.hrefLangRelations);
        const defaultLanguagePrefix = getDefaultLanguagePrefix();
        const assignedLangPrefix = getAssignedLangPrefix();
        if (languagesObj.routPrefix && languagesObj.urls.hasOwnProperty(languagesObj.routPrefix)) {
            if (lastLanguage !== languagesObj.routPrefix || defaultLanguagePrefix == languagesObj.routPrefix || assignedLangPrefix === lastLanguage) {
                var url = languagesObj.urls[languagesObj.routPrefix];
                if (url === decodeURI(window.location.origin + window.location.pathname).replace(/\/$/, "")) {
                    if (assignedLangPrefix === languagesObj.routPrefix || defaultLanguagePrefix == languagesObj.routPrefix) {
                        url = url.replace("/" + languagesObj.routPrefix, "");
                        setLanguageCookie(languagesObj.routPrefix, url);
                    } else {
                        setLanguageCookie(languagesObj.routPrefix, null);
                    }
                } else {
                    setLanguageCookie(languagesObj.routPrefix, url);
                }
            }
            return !1;
        } else {
            var hrefLangPrefix = "";
            for (var languageCode in languagesObj.urls) {
                if (lastLanguage) {
                    if (lastLanguage === languageCode && languagesObj.currentPrefix !== languageCode) {
                        window.location.replace(languagesObj.urls[languageCode]);
                        return !1;
                    }
                } else {
                    if (languagesObj.type == "2") {
                        hrefLangPrefix = languageCode.split("-").pop();
                    } else {
                        hrefLangPrefix = languageCode;
                    }
                    if (defaultLanguagePrefix !== languagesObj.detectedPrefix && languagesObj.currentPrefix !== hrefLangPrefix) {
                        if (hrefLangPrefix === languagesObj.detectedPrefix) {
                            if (languagesObj.currentUrl !== languagesObj.urls[languageCode]) {
                                window.location.replace(languagesObj.urls[languageCode]);
                                return !1;
                            }
                        } else {
                            for (var code in languagesObj.additionalCodes) {
                                var currentCode = languagesObj.additionalCodes[code];
                                currentCode.forEach((item) => {
                                    if (item.includes(`-${languagesObj.detectedPrefix}`) && defaultLanguagePrefix !== languagesObj.detectedPrefix && languagesObj.currentPrefix !== hrefLangPrefix) {
                                        window.location.replace(languagesObj.urls[code]);
                                        return !1;
                                    }
                                });
                            }
                        }
                    }
                }
            }
        }
    }
}
function getCookieObject() {
    const cookies = document.cookie;
    return cookies.split("; ").map((item) => {
        let [key, value] = item.split("=");
        return { [key]: value };
    });
}
function getLastLanguageFromCookies(cookies) {
    let lastLanguage = null;
    for (cookie of cookies) {
        if (cookie.lastlanguage) {
            lastLanguage = cookie.lastlanguage;
            break;
        }
    }
    return lastLanguage;
}
function isCustomDomain() {
    return;
}
function getDefaultLanguagePrefix() {
    return "en";
}
function getAssignedLangPrefix() {
    return "";
}
function setLanguageCookie(prefix, url) {
    var d = new Date();
    var hour = 20;
    d.setTime(d.getTime() + hour * 60 * 60 * 1000);
    var cookieExpireDate = "expires=" + d.toString();
    document.cookie = "lastlanguage=" + prefix + ";path=/; " + cookieExpireDate;
    if (url) {
        window.location.replace(url);
    }
}
</script>