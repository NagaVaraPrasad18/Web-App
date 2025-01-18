
document.getElementById('paywallForm').addEventListener("submit", function (e) {
	console.log("Submitted.....")
	e.preventDefault(); // Prevent the default form submission

	const url = document.getElementById('urlInput').value;
	const selectedMode = document.getElementById('modeSelect').value;
	console.log("selectedMode: ", selectedMode)
	if (selectedMode === 'web_scrape') {
		form.action = '/web-scrape';
	} else if (selectedMode === 'instant_view') {
		form.action = '/instant-view';
	} else if (selectedMode === 'ad_free') {
		form.action = '/ad-free';
	} else if (selectedMode === 'remove_paywall_1') {
		fetchPaywall("https://archive.is/newest/" + url);
		//fetchPaywall(url);
	} else if (selectedMode === 'remove_paywall_2') {
		fetchPaywall("https://archive.is/oldest/" + url);
	} else if (selectedMode === 'remove_paywall_3') {
		fetchPaywall("https://web.archive.org/" + url);
	} else if (selectedMode === 'remove_paywall_4') {
		fetchPaywall("https://wayback.archive.org/" + url);
	} else if (selectedMode === 'remove_paywall_5') {
		fetchPaywall("https://12ft.io/" + url);
	} else {
		//form.action = '/unknown';
		//window.location.href = "error.html";
	}

	//form.submit();
});

async function fetchPaywall(url) {
	try {
		//const response = await fetch(`http://localhost:8080/fetchPage?url=${encodeURIComponent(url)}`, {}
		console.log('Sending Request:', url);
		const response = await fetch(url, {
			method: 'GET'
		});

		// Check if the response is OK (status code 200-299)
		if (response.ok) {
			// Extract the HTML content as text
			let htmlContent = await response.text();
			console.log("HTML Content:", htmlContent);


			// Create a temporary DOM parser to manipulate the HTML
			const parser = new DOMParser();
			const doc = parser.parseFromString(htmlContent, 'text/html');

			// Fix relative paths for images
			const baseUrl = new URL(url).origin; // Extract the base URL
			const images = doc.querySelectorAll('img'); // Select all image elements
			images.forEach(img => {
				const src = img.getAttribute('src');
				if (src && !src.startsWith('http')) {
					img.setAttribute('src', baseUrl + src);
				}
			});

			// Serialize the updated HTML back to a string
			htmlContent = doc.documentElement.outerHTML;


			sessionStorage.setItem('htmlContent', htmlContent);
			// Redirect to the new page that will display the content
			window.location.href = "result.html";

		} else if (response.status == 404) {
			window.location.href = "error.html";
			console.log("404.....")
		}
		else {
			console.log("Failed to fetch the page. Status:", response.status);
		}
	} catch (error) {
		console.error("Error fetching the URL:", error);
		//e.preventDefault(); // Prevent the form from submitting
		//window.location.href = url;
		// Use an iframe to load the target URL within your website
		// If there's an error, store the iframe HTML as a string in sessionStorage
		const iframeHTML = `<iframe src="${url}" style="width: 100%; height: 100vh; border: none;"></iframe>`;
		console.log("I Frame: ", iframeHTML);
		//await sleep(10000);
		sessionStorage.setItem('htmlContent', iframeHTML);
		// Redirect to the new page that will display the content
		window.location.href = "result.html";
	}
}