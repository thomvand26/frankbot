import React, { useRef } from 'react';
import { useState } from 'react';
import { default as classNames } from 'classnames';
import { useEffect } from 'react';
import { useChatbot } from '../../services';

export default () => {
	const [inputValue, setInputValue] = useState('');
	// {message, isUser} message = text/html
	const [messages, setMessages] = useState([]);
	const chatDisplayRef = useRef(null);
	const { reply: botReply, setAddToDisplay, botReady } = useChatbot();

	useEffect(() => {
		if (!botReady) return;
		setAddToDisplay({ callback: addToDisplay });
		addToDisplay(
			<>
				<button className="chatButton" onClick={() => sayAsUser('temperatuur')}>Temperatuur</button>
				<button className="chatButton" onClick={() => sayAsUser('wind')}>Wind</button>
				<button className="chatButton" onClick={() => sayAsUser('regen')}>Regen</button>
			</>
		);
	}, [botReady]);

	useEffect(() => {
		if (!chatDisplayRef.current) return;

		chatDisplayRef.current.scrollTo({
			top: chatDisplayRef.current.scrollHeight,
		});
	}, [messages]);

	// message = text/html
	function addToDisplay(message, isUser = false) {
		if (message === '') return;
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
		// Stop de functie als er geen input is
		if (inputValue.trim().length < 1) {
			setInputValue('');
			return;
		}

		sayAsUser(inputValue);

		// chatInput.value = '';
		setInputValue('');
	}

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
