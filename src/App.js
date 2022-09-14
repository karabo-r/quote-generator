import React, { useEffect, useState } from "react";
import styled from "styled-components";
const App = () => {
	const [singleQuote, setSingleQuote] = useState([]);
	const [isViewingMultiQuotes, setIsViewingMultiQuotes] = useState(false);
	const [listOfAuthors, setListOfAuthors] = useState([]);
	const [listOfQuotes, setListOfQuotes] = useState([]);


	const processedSingleQuote = singleQuote?.map((item) => {
		return (
			<>
				<h1 className="quote">{item.quoteText}</h1>
				{/* {sing} */}
				
				<div className={singleQuote.length <= 1 ? 'author' : 'remove-author'} onClick={requestQuotesFromAuthor}>
					<h2>{item.quoteAuthor}</h2> <br />
					<p>{item.quoteGenre}</p>
				</div>
			</>
		);
	});

	const multiQuotes = "ASDF";

	
	async function requestQuotesFromAuthor() {
		const author = (singleQuote[0].quoteAuthor).split(' ').join('+');
		const link = `https://quote-garden.herokuapp.com/api/v3/quotes/?author=${author}`
		console.log(link);
		fetch(link)
		.then(response=>response.json())
		.then(data=>{
			
			// let array = []
			// const threeQuotes = data.data.map(quote => {
			// 	if (array.length < 3) {
			// 		array.push(quote)
			// 	}
			// 	return array
			// })
			// data.data.split(0, 3)

			let numberOfQuotes = 0
			let arrayOfQuotes = []
			data.data.map(quote => {
				if (numberOfQuotes < 3) {

					arrayOfQuotes.push(quote)
					numberOfQuotes++
				}
			})

			setSingleQuote(arrayOfQuotes)
			setIsViewingMultiQuotes(true)


			// console.log(arrayOfQuotes);
			// setSingleQuote(data.data)
			// setIsViewingMultiQuotes(true)
		})

	}


	

	function fetchRandomQuote() {
		fetch("https://quote-garden.herokuapp.com/api/v3/quotes/random")
			.then((response) => response.json())
			.then((data) => {
				// console.log(data.data[0]);
				setSingleQuote(data.data);
				// setQuotes(quotes.push(data.data[0]));
			});
	}

	// fetch a random quote
	useEffect(() => {
		fetchRandomQuote();
	}, []);

	return (
		<Container>
			<button onClick={fetchRandomQuote}>random</button>
			<div className="display">
				{/* {isViewingMultiQuotes && <h1 className="title">{singleQuote[0].quoteAuthor}</h1>} */}
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
	}

	.display {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 100vh;
		width: 50%;
		position: relative;
	
		.title{
			position: absolute;
			top: 5rem;
			left: 0;
			font-size: 2rem;
		}

		.quote {
			font-family: "Raleway";
			font-style: normal;
			font-weight: 500;
			font-size: 2rem;
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
			/* align-items: center; */
			flex-direction: column;
			/* justify-content: center; */
			/* background-color: rebeccapurple; */
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
