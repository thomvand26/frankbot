import {
	default as React,
	useContext,
	createContext,
	useState,
	useEffect,
} from 'react';
import RiveScript from 'rivescript';
import { openWeatherConfig } from '../config';

import Brain from '../rivescript/brain.rive';

// De context
const ChatbotContext = createContext();

// De hook
const useChatbot = () => useContext(ChatbotContext);

// De context provider
const ChatbotProvider = ({ children }) => {
	// De instantie van de chatbot
	const [bot, setBot] = useState();
	// De 'addToDisplay'-functie (gelinkt vanuit het 'ChatDisplay'-component)
	const [addToDisplay, setAddToDisplay] = useState();

	// Wanneer dit component geïnitialiseerd wordt:
	useEffect(() => {
		// Instantieer de chatbot en voeg deze toe aan de 'bot'-state
		setBot(new RiveScript());
	}, []);

	// Wanneer de chatbot wel/niet geïnstantieerd wordt,
	// en/of wanneer de 'addToDisplay'-functie gelinkt wordt:
	useEffect(() => {
		// Voer volgende code niet uit als de bot niet geïnstantieerd of de 'addToDisplay'-functie niet gelinkt is
		if (!bot || !addToDisplay) return;

		// Voeg de functie 'getWeather' toe aan het RiveScript-bestand
		bot.setSubroutine('getWeather', getWeather);
	}, [bot, addToDisplay]);

	// Wanneer de chatbot wel/niet geïnstantieerd wordt:
	useEffect(() => {
		// Initialiseer de chatbot als deze nog niet geïnstantieerd is
		if (!bot) return;
		initializeBot();
	}, [bot]);

	// Initialiseer de chatbot
	async function initializeBot() {
		try {
			// Laad het RiveScript bestand
			await bot.loadFile(Brain);

			// Verwerk en sorteer de triggers en antwoorden
			bot.sortReplies();

			// Voeg de variabele 'location', met bijbehorende waarde 'gent' toe aan het RiveScript-bestand
			bot.setUservar('local-user', 'location', 'gent');

			console.log('De chatbot is geïnitialiseerd!');
		} catch (error) {
			console.log(error);
		}
	}

	// Verwerk een input door de bot
	function reply(input) {
		return bot.reply('local-user', input);
	}

	// Verkrijg het weer via de Open Weather API
	async function getWeather(rs, args) {
		// Verkrijg het weer via de Open Weather API
		const fetchUrl = `${openWeatherConfig.baseURL}weather?q=${args[0]}&units=metric&lang=nl&APPID=${openWeatherConfig.ApiKey}`;
		const response = await fetch(fetchUrl);
		const data = await response.json();

		// Het laatst te geven bericht
		let finalResponse = '';

		// Genereer antwoorden die bij het tweede argument passen (met de verkregen data)
		switch (args[1]) {
			case 'temperatuur':
				finalResponse = `Het is nu ${parseInt(data.main.temp)}°C in ${data.name}.`;
				break;
			case 'wind':
				finalResponse = `Er zijn momenteel windsnelheden van ${parseInt(data.wind.speed)} meter per seconde in ${data.name}.`;
				break;
			case 'regen':
				if (data.rain) {
					finalResponse = `Het voorbije uur heeft het ${parseInt(data.rain.rain['1h'])}mm/m² geregend in ${data.name}.`;
				} else {
					finalResponse = `Het voorbije uur heeft het niet geregend in ${data.name}.`;
				}
				break;

			// Genereer een antwoord als er geen tweede argument is
			default:
				// Voeg direct een bericht toe aan het chatvenster (niet via een antwoord in het RiveScript-bestand)
				addToDisplay.callback(
					`De weersvoorspelling voor vandaag is ${data.weather[0].description} in ${data.name}.`
				);
				// Voeg direct knoppen toe aan het chatvenster
				addToDisplay.callback(
					<>
						<button
							className="chatButton"
							onClick={() => sayAsUser('temperatuur')}
						>
							Temperatuur
						</button>
						<button className="chatButton" onClick={() => sayAsUser('wind')}>
							Wind
						</button>
						<button className="chatButton" onClick={() => sayAsUser('regen')}>
							Regen
						</button>
					</>
				);
				break;
		}

		// Geef het laats te geven bericht terug (als antwoord) aan het RiveScript-bestand
		return finalResponse;
	}

	// Verstuur een bericht in naam van de gebruiker
	async function sayAsUser(message) {
		// Voeg het bericht toe aan het chatvenster
		addToDisplay.callback(message.trim(), true);

		// Verwerk het bericht door de chatbot en krijg een gepast antwoord
		const replyFromBot = await reply(message);

		// Voeg het antwoord toe aan het chatvenster
		addToDisplay.callback(replyFromBot.trim());
	}

  // Maak bepaalde functies/variabelen beschikbaar in de context provider
	const exports = {
		setAddToDisplay,
		reply,
		botReady: !!bot,
	};

  // Geef de context provider terug
	return (
		<ChatbotContext.Provider value={exports}>
			{children}
		</ChatbotContext.Provider>
	);
};

export { ChatbotContext, ChatbotProvider, useChatbot };
