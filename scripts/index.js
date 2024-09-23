const accountBalance = document.getElementById('account-balance');
const donateNowButtons = document.querySelectorAll('.donate-now-btn');
const dialog = document.getElementById('my_modal_1');

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
