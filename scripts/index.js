const accountBalance = document.getElementById('account-balance');
const donateNowButtons = document.querySelectorAll('.donate-now-btn');
const dialog = document.getElementById('my_modal_1');
const menus = document.querySelectorAll('.menu-btn');
const donateBtn = document.getElementById('donate-btn');
const historyBtn = document.getElementById('history-btn');
const donationEvents = document.getElementById('donation-events');
const donationHistory = document.getElementById('donation-history');

menus.forEach((btn) => {
	btn.addEventListener('click', (event) => {
		const clickedBtn = event.target;
		const otherBtn = btn.id === 'donate-btn' ? historyBtn : donateBtn;

		toggleButtonAndSection(clickedBtn, otherBtn);
	});
});

donateNowButtons.forEach((btn) => {
	btn.addEventListener('click', donateNow);
});

function validateInput(value) {
	if (value === '' || value === '0') return false;
	let decimalCount = 0;

	for (let char of value) {
		const charCode = char.charCodeAt(0);
		if (charCode < 48 || charCode > 57) {
			if (charCode === 46) {
				decimalCount++;
				if (decimalCount > 1) return false;
			} else {
				return false;
			}
		}
	}

	return true;
}

function donateNow(event) {
	const card = event.target.closest('.card');
	const inputField = card.querySelector('.donation-input');
	const isValidInput = validateInput(inputField.value);

	if (!isValidInput) {
		alert('Please enter a valid amount!');
		inputField.value = '';
		return;
	}

	const donationEventName = card.querySelector('.card-title').innerText;
	let donationAmount = parseFloat(inputField.value);
	donationAmount = parseFloat(donationAmount.toFixed(2));
	const remainingBalance =
		parseFloat(accountBalance.innerText) - donationAmount;

	if (remainingBalance < 0) {
		alert('Insufficient balance!');
		inputField.value = '';
		return;
	}

	let totalFund = parseFloat(card.querySelector('.total-fund').innerText);
	totalFund += donationAmount;
	card.querySelector('.total-fund').innerText = totalFund.toFixed(2) + ' BDT';
	accountBalance.innerText = remainingBalance.toFixed(2) + ' BDT';

	createTransactionHistory(donationAmount, donationEventName);
	dialog.showModal();
	inputField.value = '';
}

function toggleButtonAndSection(clickedBtn, otherBtn) {
	clickedBtn.classList.add('bg-lime-400');
	clickedBtn.classList.remove('btn-outline', 'border-2', 'border-gray-200');

	otherBtn.classList.add('btn-outline', 'border-2', 'border-gray-200');
	otherBtn.classList.remove('bg-lime-400');

	if (clickedBtn.id === 'donate-btn') {
		donationEvents.classList.remove('hidden');
		donationHistory.classList.add('hidden');
	} else {
		donationHistory.classList.remove('hidden');
		donationEvents.classList.add('hidden');
	}
}

function createTransactionHistory(donationAmount, donationEventName) {
	const newDate = new Date();
	const newDonation = document.createElement('div');
	newDonation.classList.add(
		'p-6',
		'border-2',
		'border-gray-200',
		'rounded-xl'
	);
	newDonation.innerHTML = `
		<h2 class="font-bold text-xl mb-4">${donationAmount} Taka is donated at "${donationEventName}"</h2>
		<p class="text-gray-500">Date: ${newDate}</p>
		`;

	donationHistory.prepend(newDonation);
}
