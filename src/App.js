import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Contact from "./Components/Contact";
import Quotes from "./Components/Quotes";
const App = () => {
	const [quotes, setQuotes] = useState([]);
	const [isViewingMultiQuotes, setIsViewingMultiQuotes] = useState(false);

	const processedQuotes = quotes?.map((item) => {
		return (
			<>
				<h1 className="quote">{item.quoteText}</h1>
				<div
					className={quotes.length <= 1 ? "author" : "remove-author"}
					onClick={requestQuotesFromAuthor}
				>
					<h2>{item.quoteAuthor}</h2> <br />
					<p>{item.quoteGenre}</p>
				</div>
			</>
		);
	});

	function requestQuotesFromAuthor() {
		const author = quotes[0].quoteAuthor.split(" ").join("+");
		const link = `https://quote-garden.herokuapp.com/api/v3/quotes/?author=${author}`;
		fetch(link)
			.then((response) => response.json())
			.then((data) => {
				// the limit api parameter doesn't work on authors quotes
				// limit to only 3 quotes to be displayed
				let numberOfQuotes = 0;
				let arrayOfQuotes = [];
				data.data.map((quote) => {
					if (numberOfQuotes < 3) {
						arrayOfQuotes.push(quote);
						numberOfQuotes++;
					}
				});

				setQuotes(arrayOfQuotes);
				setIsViewingMultiQuotes(true);
			});
	}

	function fetchRandomQuote() {
		fetch("https://quote-garden.herokuapp.com/api/v3/quotes/random")
			.then((response) => response.json())
			.then((data) => {
				setQuotes(data.data);
				setIsViewingMultiQuotes(false);
			});
	}

	// fetch a random quote
	useEffect(fetchRandomQuote, []);

	const propsCollection = {
		quotes,
		processedQuotes,
		isViewingMultiQuotes,
	};
	return (
		<Container>
			<button onClick={fetchRandomQuote} className="generate-button">
				random <img src="autorenew-icon.svg" alt="Get a random quote" />
			</button>
			<Quotes {...propsCollection} />
			<Contact />
		</Container>
	);
};

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;

	.generate-button {
		position: absolute;
		right: 1rem;
		top: 1.2rem;
		font-family: "Raleway";
		font-style: normal;
		background-color: transparent;
		outline: none;
		border: none;
		cursor: pointer;
		font-size: 1.1rem;
		text-align: center;
		display: flex;

		img {
			margin-left: 7px;
			width: 20px;
			height: auto;
		}
	}

	.display {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 100vh;
		width: 50%;
		position: relative;

		.title {
			position: absolute;
			top: 5rem;
			left: 0;
			font-size: 2rem;
		}

		.quote {
			font-family: "Raleway";
			font-style: normal;
			font-weight: 500;
			font-size: 1.5rem;
			padding-left: 3rem;
			border-left: 0.5rem solid #f7df94;
		}

		.author {
			height: 10%;
			margin-top: 4rem;
			font-size: 1.4rem;
			width: 100%;
			display: flex;
			align-items: left;
			flex-direction: column;
			padding: 1.2rem;
			line-height: 15px;

			p {
				color: white;
				text-transform: uppercase;
				font-size: 0.8rem;
				opacity: 80%;
			}
		}

		.author:hover {
			background-color: #333333;
			color: white;
		}

		.remove-author {
			visibility: hidden;
		}

		@media only screen and (max-width: 600px) {
			width: 100%;

			.quote {
				font-size: 1.5rem;
				padding-left: 1.5rem;
			}
			.author {
				align-items: center;
			}
		}
	}
	@media only screen and (max-width: 600px) {
		.generate-button {
			right: 1rem;
		}
	}
`;
export default App;
