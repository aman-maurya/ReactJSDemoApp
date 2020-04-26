import React from 'react';

const Pagination = (props) => {
	const pageLinks = [];
	for (let index = 1; index < props.pages; index++) {
        let active = props.currentPage === index ? 'active' : '';
        let href;
        if(active === ''){
            href = (
				<a
					className="page-link"
					href="#"
					onClick={(e) => {
						e.preventDefault();
						props.nextPage(index);
					}}
				>
					{index}
				</a>
			);
        }else{
            href = (
				<a
					className="page-link"
					href="#"
					onClick={(e) => {
						e.preventDefault();
						props.nextPage(index);
					}}
				>
					{index}
				</a>
			);
        }
		pageLinks.push(
			<li className={`page-item ${active}`} key={index}>
				{href}
			</li>
		);
	}

	return (
		<nav aria-label="Page navigation example">
			<ul className={'pagination'}>{pageLinks}</ul>
		</nav>
	);
};

export default Pagination;
