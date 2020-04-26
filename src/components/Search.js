import React from 'react';

const Search = React.forwardRef((props, ref) => {
	return (
		<form ref={ref} className="form-inline" action="" onSubmit={props.handleSubmit}>
			<div className="input-group mb-3">
				<input
					type="text"
					className="form-control"
					placeholder="Search..."
					aria-label="Search..."
					aria-describedby="basic-addon2"
					onChange={props.handleChange}
				/>
				<div className="input-group-append">
					<button type="submit" className="btn btn-outline-secondary">
						<i className="fa fa-search"></i>
					</button>
				</div>
			</div>
		</form>
	);
});

export default Search;
