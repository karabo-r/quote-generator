import React from "react";

const Quotes = ({ quotes, processedQuotes, isViewingMultiQuotes }) => {
	return (
		<div className="display">
			{isViewingMultiQuotes && (
				<h1 className="title">{quotes[0].quoteAuthor}</h1>
			)}
			{processedQuotes}
		</div>
	);
};

export default Quotes;
