import { locales } from "../translate/locales.js";

const availableLocales = Object.keys(locales);

// Obtener el lang del html
const htmlLang = document.querySelector("html").getAttribute("lang");

// Obtener el lang del navegador
const browserLang = navigator.language;

// Quitar el guion bajo del lang del navegador
const browserLangWithoutUnderscore = browserLang.split("-")[0];

// Add event listener to the language select dropdown
const selectedLanguage = document.querySelector("#selectedLanguage");

// Select the default language based on browser language
selectedLanguage.value = browserLangWithoutUnderscore;

let language = browserLangWithoutUnderscore;

// If `?lang=` exists in URL params & is valid, then use that instead.
const urlParams = new URLSearchParams(window.location.search);
const langFromUrl = urlParams.get("lang");
if (langFromUrl && availableLocales.includes(langFromUrl)) {
	language = langFromUrl;
}

// Function to update page content based on selected language
function updateContent(language) {
	// Get JSON object of translations.
	const json = locales[language];

	// Get all page elements to be translated.
	const elements = document.querySelectorAll("[data-i18n]");

	// On each element, found the translation from JSON file & update.
	elements.forEach((element, index) => {
		const key = element.getAttribute("data-i18n");
		let text = key
			.split(".")
			.reduce((obj, i) => (obj ? obj[i] : null), json);

		// En caso text sea undefined, se asigna el valor de key
		text = text || key;

		// Does this text have any variables? (eg {something})
		const variables = text.match(/{(.*?)}/g);
		if (variables) {
			// Iterate each variable in the text.
			variables.forEach((variable) => {
				// Filter all `data-*` attributes for this element to find the matching key.
				Object.entries(element.dataset).filter(([key, value]) => {
					if (`{${key}}` === variable) {
						try {
							// Attempt to run actual JavaScript code.
							text = text.replace(
								`${variable}`,
								new Function(`return (${value})`)()
							);
						} catch (error) {
							// Probably just static text replacement.
							text = text.replace(`${variable}`, value);
						}
					}
				});
			});
		}

		// Regular text replacement for given locale.
		element.innerHTML = text;
	});

	// Set <html> tag lang attribute.
	document.querySelector("html").setAttribute("lang", language);
}

// Initial content update based on URL parameter or default language
updateContent(language);

selectedLanguage.addEventListener("change", (event) => {
	const selectedLanguage = event.target.value;
	updateContent(selectedLanguage);
});
