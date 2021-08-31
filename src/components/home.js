/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import axios from 'axios';
import wtf from 'wtf_wikipedia';

function HomePage() {
	const [country, setCountry] = useState('');
	const [countryLeaders, setCountryLeaders] = useState(null);

	const extractLeaderInfo = (wikitext) => {
		const leaders = [];
		const infobox = wtf(wikitext).infobox();

		if (infobox) {
			const firstLeaderTitle = infobox.get('leader_title1');
			const firstLeaderName = infobox.get('leader_name1');
			leaders.push({
				title: firstLeaderTitle?.text(),
				name: firstLeaderName?.text(),
			});

			const secondLeaderTitle = infobox.get('leader_title2');
			const secondLeaderName = infobox.get('leader_name2');
			leaders.push({
				title: secondLeaderTitle?.text(),
				name: secondLeaderName?.text(),
			});
		}

		return leaders;
	};

	const fetchWikiText = (pagePath) => {
		return axios.get('https://en.wikipedia.org/w/api.php', {
			params: {
				action: 'parse',
				format: 'json',
				page: pagePath,
				prop: 'wikitext',
				formatversion: '2',
				section: '0',
				origin: '*',
			},
		});
	};

	const fetchLeaderInfo = async (countryUrlPath) => {
		try {
			const wikipediaApiResponse = await fetchWikiText(countryUrlPath);
			const wikitext = wikipediaApiResponse?.data?.parse?.wikitext;
			if (wikitext) {
				const leaders = extractLeaderInfo(wikitext);
				setCountryLeaders(leaders);
				console.log(leaders);
			}
		} catch (error) {
			console.error(error);
		}
	};

	const onCountryChanged = (event) => {
		const newCountry = event.target.value;
		setCountry(newCountry);
		fetchLeaderInfo(newCountry);
	};

	return (
		<div className="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
			<header className="mb-auto">
				<div />
			</header>
			<main className="px-3">
				<h1>WikiGovernment</h1>
				<p className="lead">
					WikiGovernment is powered by Wikipedia to help you find the
					head of government from all UN recognized countries.
				</p>
				<div className="container">
					<div className="row justify-content-md-center">
						<div className="col-md-auto">
							<form>
								<select
									value={country}
									className="form-select"
									aria-label="Default select example"
									onChange={onCountryChanged}
								>
									<option value="DEFAULT">
										Choose a Country
									</option>
									<option value="Nigeria">Nigeria</option>
									<option value="Ghana">Ghana</option>
									<option value="United_States">
										United States
									</option>
									<option value="United_Kingdom">
										United Kingdom
									</option>
								</select>
							</form>
						</div>
					</div>
				</div>
			</main>
			<section className="px-3">
				<table className="table leader-result-table">
					<thead>
						<tr>
							<td>Title</td>
							<td>Name</td>
						</tr>
					</thead>
					{countryLeaders?.map((leader) => (
						<tbody key={leader.name}>
							<tr>
								<td>{leader.title}</td>
								<td>{leader.name}</td>
							</tr>
						</tbody>
					))}
				</table>
			</section>
		</div>
	);
}

export default HomePage;
