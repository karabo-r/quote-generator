import React, { useEffect, useState } from "react";
import styled from "styled-components";
const App = () => {
	const [singleQuote, setSingleQuote] = useState([]);
	const [isViewingMultiQuotes, setIsViewingMultiQuotes] = useState(false);

	const processedSingleQuote = singleQuote?.map((item) => {
		return (
			<>
				<h1 className="quote">{item.quoteText}</h1>

				<div
					className={singleQuote.length <= 1 ? "author" : "remove-author"}
					onClick={requestQuotesFromAuthor}
				>
					<h2>{item.quoteAuthor}</h2> <br />
					<p>{item.quoteGenre}</p>
				</div>
			</>
		);
	});

	async function requestQuotesFromAuthor() {
		const author = singleQuote[0].quoteAuthor.split(" ").join("+");
		const link = `https://quote-garden.herokuapp.com/api/v3/quotes/?author=${author}`;
		console.log(link);
		fetch(link)
			.then((response) => response.json())
			.then((data) => {
				let numberOfQuotes = 0;
				let arrayOfQuotes = [];
				data.data.map((quote) => {
					if (numberOfQuotes < 3) {
						arrayOfQuotes.push(quote);
						numberOfQuotes++;
					}
				});

				setSingleQuote(arrayOfQuotes);
				setIsViewingMultiQuotes(true);
			});
	}

	function fetchRandomQuote() {
		fetch("https://quote-garden.herokuapp.com/api/v3/quotes/random")
			.then((response) => response.json())
			.then((data) => {
				setSingleQuote(data.data);
				setIsViewingMultiQuotes(false);
			});
	}

	// fetch a random quote
	useEffect(() => {
		fetchRandomQuote();
	}, []);

	return (
		<Container>
			<button onClick={fetchRandomQuote}>
				random <img src="autorenew-icon.svg" />
			</button>
			<div className="display">
				{isViewingMultiQuotes && (
					<h1 className="title">{singleQuote[0].quoteAuthor}</h1>
				)}
				{processedSingleQuote}
			</div>
		</Container>
	);
};

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;

	button {
		position: absolute;
		right: 3rem;
		top: 1rem;
		font-family: "Raleway";
		font-style: normal;
		background-color: transparent;
		outline: none;
		border: none;
		cursor: pointer;
		font-size: 1rem;
		text-align: center;
		display: flex;

		img {
			margin-left: 5px;
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
			border-left: 0.5rem solid #f7df94;
			padding-left: 3rem;
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
	}
`;
export default App;
