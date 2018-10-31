let changeColor = document.getElementById('changeColor');

chrome.storage.sync.get('color', (data) => {
	changeColor.style.backgroundColor = data.color;
	changeColor.setAttribute('value', data.color);
} )

changeColor.onclick = (element) => {
	let color = element.target.value;
	chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
		chrome.tabs.executeScript(
			tabs[0].id,
			{ code: 'document.body.style.backgroundColor = " ' + color + ' " ;' }
			);
	} )
}
// when the user triggers the popup
chrome.runtime.sendMessage({ greeting: "hello there" }, (response) => {
	// alert(response.message)
});



