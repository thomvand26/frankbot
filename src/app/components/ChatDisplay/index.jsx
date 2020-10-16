import React, { useRef } from 'react';
import { useState } from 'react';
import { default as classNames } from 'classnames';
import { useEffect } from 'react';
import { useChatbot } from '../../services';

export default () => {
    // De inputwaarde van de gebruiker
    const [inputValue, setInputValue] = useState('');
    // Alle berichten die in het chatvenster komen
	const [messages, setMessages] = useState([]);
    // De referentie naar het chatvenster
	const chatDisplayRef = useRef(null);
    // Functionaliteit van de chatbot
	const { reply: botReply, setAddToDisplay, botReady } = useChatbot();

    // Wanneer de chatbot wel/niet geïnitialiseerd wordt:
	useEffect(() => {
        // Voer volgende code niet uit als de bot niet geïnitialiseerd is
        if (!botReady) return;

        // Link de 'addToDisplay' functie in aan de chatbot service (store)
		setAddToDisplay({ callback: addToDisplay });
	}, [botReady]);

    // Wanneer er bericht bijkomen:
	useEffect(() => {
        // Voer volgende code niet uit als het chatvenster nog niet bestaat is
		if (!chatDisplayRef.current) return;

        // Scroll naar beneden (naar het nieuwste bericht)
		chatDisplayRef.current.scrollTo({
			top: chatDisplayRef.current.scrollHeight,
		});
	}, [messages]);

	// Voeg een bericht toe aan het chatvenster
	function addToDisplay(message, isUser = false) {
        // Voer volgende code niet uit als het bericht een lege string is
        if (message === '') return;
        
        // Voeg een bericht toe aan de 'messages'-state
		setMessages((prev) => [
			...prev,
			{
				message,
				isUser,
			},
		]);
	}

	// Verstuur het bericht
	async function send() {
		// Voer volgende code niet uit als er geen input is
		if (inputValue.trim().length < 1) {
			setInputValue('');
			return;
		}

		// Voer volgende code niet uit als er geen input is
		sayAsUser(inputValue);

		// Reset de input in het de 'inputValue' state (en dus ook het inputveld)
		setInputValue('');
	}

	// Verstuur een bericht in naam van de gebruiker
	async function sayAsUser(message) {
		// Voeg het bericht toe aan het chatvenster
		addToDisplay(message.trim(), true);

		// Verwerk het bericht door de chatbot en krijg een gepast antwoord
		const reply = await botReply(message);

		// Voeg het antwoord toe aan het chatvenster
		addToDisplay(reply.trim());
	}

	// Luister naar veranderingen van het inputveld
	function onInputChange(e) {
		// Verwijder de witruimte van de input en sla deze op
		setInputValue(e.target.value);
	}

	// Luister naar het klikken op de 'Verstuur'-knop (en het drukken op de Enter-toets)
	function onSubmit(e) {
		// Voorkom dat het scherm ververst wordt
		e.preventDefault();

		// Verstuur de opgeslagen input
		send();
	}

	return (
		<div className="chatContainer">
			<div className="chatDisplay" ref={chatDisplayRef}>
				{messages.map((messageObject, index) => (
					<div
						key={`message-${index}`}
						className={classNames(
							'chatMessage',
							`${messageObject.isUser && 'chatMessage--user'}`
						)}
					>
						{messageObject.message}
					</div>
				))}
			</div>
			<form className="chatForm" autoComplete="off" onSubmit={onSubmit}>
				<input
					className="chatInput"
					type="text"
					name="chatInput"
					id="chatInput"
					onChange={onInputChange}
					value={inputValue}
					autoFocus
				/>
				<button type="submit" className="chatSend">
					Verstuur
				</button>
			</form>
		</div>
	);
};
