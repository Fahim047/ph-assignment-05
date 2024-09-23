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

	const donationAmount = parseFloat(inputField.value);
	const currentBalance =
		parseFloat(accountBalance.innerText) - donationAmount;

	if (currentBalance < 0) {
		alert('Insufficient balance!');
		inputField.value = '';
		return;
	}

	let totalFund = parseFloat(card.querySelector('.total-fund').innerText);
	totalFund += donationAmount;
	card.querySelector('.total-fund').innerText = totalFund + ' BDT';
	accountBalance.innerText = currentBalance + ' BDT';

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
