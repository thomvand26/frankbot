import {
	default as React,
	useContext,
	createContext,
	useState,
	useEffect,
	useCallback,
} from 'react';
import RiveScript from 'rivescript';
import { openWeatherConfig } from '../config';

import Brain from '../rivescript/brain.rive';

const ChatbotContext = createContext();
const useChatbot = () => useContext(ChatbotContext);

const ChatbotProvider = ({ children }) => {
	const [bot, setBot] = useState();
	const [addToDisplay, setAddToDisplay] = useState();

	useEffect(() => {
    setBot(new RiveScript());
    console.log('Triggers: weer, temperatuur, wind, regen');
	}, []);

	useEffect(() => {
		if (!bot || !addToDisplay) return;
		bot.setSubroutine('getWeather', getWeather);
	}, [bot, addToDisplay]);

	useEffect(() => {
		if (!bot) return;
		initializeBot();
	}, [bot]);
	// const findAllPosts = async (query = null) => {
	// }

	// Initialiseer de chatbot
	async function initializeBot() {
		console.log(bot);
		try {
			// Laad het RiveScript bestand
			await bot.loadFile(Brain);

			// Verwerk en sorteer de triggers en antwoorden
			bot.sortReplies();

			// bot.setSubroutine('getWeather', getWeather);
      // bot.setSubroutine('getWeather', getWeather2);
      bot.setUservar('local-user', 'location', 'gent')

			console.log('De chatbot is geïnitialiseerd!');
		} catch (error) {
			console.log(error);
		}
	}

	function reply(input) {
		return bot.reply('local-user', input);
	}

	async function getWeather(rs, args) {
		console.log(args);
		// const fetchUrl = `${openWeatherConfig.baseURL}weather?q=Gent,be&units=metric&lang=nl&APPID=${openWeatherConfig.ApiKey}`;
		const fetchUrl = `${openWeatherConfig.baseURL}weather?q=${args[0]}&units=metric&lang=nl&APPID=${openWeatherConfig.ApiKey}`;
		const response = await fetch(fetchUrl);
		const data = await response.json();

		let finalResponse = '';

		switch (args[1]) {
			case 'temperatuur':
				finalResponse = `Het is nu ${parseInt(data.main.temp)}°C in ${ data.name }.`;
				break;
			case 'wind':
				finalResponse = `Er zijn momenteel windsnelheden van ${parseInt(data.wind.speed)} meter per seconde in ${ data.name }.`;
				break;
			case 'regen':
        if (data.rain) {
          finalResponse = `Het voorbije uur heeft het ${parseInt(data.rain.rain['1h'])}mm/m² geregend in ${ data.name }.`;
        } else {
          finalResponse = `Het voorbije uur heeft het niet geregend in ${ data.name }.`;
        }
				break;

			default:
        addToDisplay.callback(`De weersvoorspelling voor vandaag is ${data.weather[0].description} in ${ data.name }.`);
        addToDisplay.callback(<button onClick={() => sayAsUser('temperatuur')}>Temperatuur</button>);
				break;
		}
		console.log(fetchUrl);
		console.log(data);
		// console.log(sayAsUser);
		return finalResponse;
	}

	async function sayAsUser(message) {
		// Voeg het bericht toe aan het chatvenster
		addToDisplay.callback(message.trim(), true);

		// Verwerk het bericht door de chatbot en krijg een gepast antwoord
		const replyFromBot = await reply(message);
		console.log(replyFromBot);

		// Voeg het antwoord toe aan het chatvenster
		addToDisplay.callback(replyFromBot.trim());
		console.log(message);
	}

	// function showOptions() {

	// }

	// function setAddToDisplayCB(cb) {
	// 	setAddToDisplay({cb});
	// }

	const exports = {
		setAddToDisplay,
		reply,
		botReady: !!bot,
	};

	return (
		<ChatbotContext.Provider value={exports}>
			{children}
		</ChatbotContext.Provider>
	);
};

export { ChatbotContext, ChatbotProvider, useChatbot };
