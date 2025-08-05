export default function decorate(block) {
  block.innerHTML = ''; // Clears the existing content of the block

  // Main container for steps
  const container = document.createElement('div');
  container.className = 'business-card-builder';
  block.append(container);

  // --- Step 1: Form ---
  const step1 = document.createElement('div');
  step1.className = 'step step-1 active-step';

  const form = document.createElement('form');
  form.className = 'my-custom-form';

  // Radio buttons container
  const radioButtonsContainer = document.createElement('div');
  radioButtonsContainer.className = 'radio-buttons-container';

  // Helper function to create agent selection card
  const createPersonCard = (name, imageUrl, value) => {
    const cardDiv = document.createElement('div');
    cardDiv.className = 'person-selection-card';

    const nameSpan = document.createElement('span');
    nameSpan.className = 'person-name';
    nameSpan.textContent = name;
    cardDiv.append(nameSpan);

    const img = document.createElement('img');
    img.src = imageUrl;
    img.alt = name;
    cardDiv.append(img);

    const label = document.createElement('label');
    label.className = 'radio-label';
    const input = document.createElement('input');
    input.type = 'radio';
    input.name = 'designOption';
    input.value = value;
    label.append(input);

    // Select radio on card click
    cardDiv.addEventListener('click', () => {
      input.checked = true;
      input.dispatchEvent(new Event('change'));
    });

    cardDiv.append(label);
    return cardDiv;
  };

  // Add agent cards
  radioButtonsContainer.append(createPersonCard(
    'Susan Johnson',
    'https://s7d1.scene7.com/is/image/ADBDEMO/agent_picture?$Responsive$',
    'ADBDEMO/agent_picture',
  ));
  radioButtonsContainer.append(createPersonCard(
    'Susan Johnson',
    'https://s7d1.scene7.com/is/image/ADBDEMO/agent_picture-3?$Responsive$',
    'ADBDEMO/agent_picture-3',
  ));
  radioButtonsContainer.append(createPersonCard(
    'Susan Johnson',
    'https://s7d1.scene7.com/is/image/ADBDEMO/agent_picture-1?$Responsive$',
    'ADBDEMO/agent_picture-1',
  ));

  form.append(radioButtonsContainer);

  // Form controls container
  const formControlsDiv = document.createElement('div');
  formControlsDiv.className = 'form-controls';

  // Office dropdown
  const dropdownLabel = document.createElement('label');
  dropdownLabel.textContent = 'Select an Office:';
  const select = document.createElement('select');
  select.name = 'office';
  select.id = 'office-select';
  select.required = true;

  const option1 = document.createElement('option');
  option1.value = '1';
  option1.textContent = '424 Hadley Drive, Manhattan Beach';
  option1.selected = true;
  select.append(option1);

  dropdownLabel.append(select);
  formControlsDiv.append(dropdownLabel);

  // Phone input
  const phoneLabel = document.createElement('label');
  phoneLabel.textContent = 'Phone: ';
  const phoneInput = document.createElement('input');
  phoneInput.type = 'text';
  phoneInput.id = 'phone';
  phoneLabel.append(phoneInput);
  formControlsDiv.append(phoneLabel);

  // Preview button (Step 1 -> Step 2)
  const previewButton = document.createElement('button');
  previewButton.type = 'button';
  previewButton.textContent = 'Preview';
  previewButton.className = 'preview-button';
  previewButton.disabled = true; // Disabled until required inputs filled
  formControlsDiv.append(previewButton);

  form.append(formControlsDiv);
  step1.append(form);
  container.append(step1);

  // --- Step 2: Preview + approval ---
  const step2 = document.createElement('div');
  step2.className = 'step step-2';

  // Preview container
  const previewContainer = document.createElement('div');
  previewContainer.id = 'review';
  step2.append(previewContainer);

  // Approval checkbox + add button container
  const approveDiv = document.createElement('div');
  approveDiv.className = 'form-controls';

  const termsLabel = document.createElement('label');
  termsLabel.setAttribute('for', 'acceptCheckbox');
  termsLabel.textContent = 'By clicking this checkbox, you approve the order as you have entered.';

  const approveCheckbox = document.createElement('input');
  approveCheckbox.type = 'checkbox';
  approveCheckbox.id = 'acceptCheckbox';

  termsLabel.prepend(approveCheckbox);
  approveDiv.appendChild(termsLabel);

  const addButton = document.createElement('button');
  addButton.type = 'button';
  addButton.textContent = 'Add to cart';
  addButton.className = 'preview-button';
  addButton.disabled = true;
  approveDiv.appendChild(addButton);

  step2.append(approveDiv);

  // Back button to return to Step 1
  const backButton = document.createElement('button');
  backButton.type = 'button';
  backButton.textContent = 'Back';
  backButton.className = 'preview-button';
  backButton.style.marginTop = '1rem';
  step2.append(backButton);

  container.append(step2);

  // --- Event Listeners ---

  // Enable preview button only if image & office selected
  const checkFormCompletion = () => {
    const imageSelected = form.querySelector('input[name="designOption"]:checked') !== null;
    const officeSelected = select.value !== '';
    previewButton.disabled = !(imageSelected && officeSelected);
  };

  form.querySelectorAll('input[name="designOption"]').forEach(radio => {
    radio.addEventListener('change', checkFormCompletion);
  });
  select.addEventListener('change', checkFormCompletion);

  // Preview button click — generate preview and show step 2
  previewButton.addEventListener('click', () => {
    const selectedOption = form.querySelector('input[name="designOption"]:checked');
    const selectedOffice = select.value;
    const phoneNumber = phoneInput.value.trim();

    const imageURL = 'https://s7d1.scene7.com/is/image/ADBDEMO/video-background?';
    const pictureURL = selectedOption ? `$picture=${selectedOption.value}&` : '';
    const newLine = '%5Cline%20';

    const agentName = '$name=Susan Johnson&';
    let address = '$address=';

    switch (selectedOffice) {
      case '1':
        address = `${address}424 Hadley Drive${newLine}Suite F${newLine}Manhattan Beach, CA${newLine}90266-16717`;
        break;
      case '2':
        address = `${address}5513 S Eastern Ave${newLine}Las Vegas, NV 89119`;
        break;
      default:
        address += '';
    }

    if (phoneNumber !== '') {
      address += newLine + phoneNumber + newLine;
    } else {
      address += newLine + newLine;
    }

    const finalURL = `${imageURL}${pictureURL}${agentName}${address}`;
    previewContainer.innerHTML = `<img src="${finalURL}">`;
    previewContainer.style.display = 'block';

    // Switch steps
    step1.classList.remove('active-step');
    step2.classList.add('active-step');

    // Reset approval checkbox and hide add button
    approveCheckbox.checked = false;
  });

  // Back button click — go back to form step
  backButton.addEventListener('click', () => {
    step2.classList.remove('active-step');
    step1.classList.add('active-step');
  });

  // Show/hide add button based on checkbox state
  approveCheckbox.addEventListener('change', () => {
    addButton.disabled = !addButton.disabled;
  });

  // Add to cart button click - simulate adding process
  addButton.addEventListener('click', (e) => {
    e.preventDefault();

    // Save original button text
    const originalText = addButton.textContent;

    // First show loading state
    addButton.textContent = 'Adding...';
    addButton.disabled = true; // Optional: disable button during process

    // Simulate loading delay (replace this with your actual async operation)
    setTimeout(() => {
      // After loading completes, show success state
      addButton.disabled = false;
      addButton.textContent = 'Added ✓';

      // Optional: revert back to original state after some time
      setTimeout(() => {
        addButton.textContent = originalText;
      }, 1500); // Revert after 1.5 seconds
    }, 1000); // Simulate 1 second loading time
  });

  // Initial check to enable/disable preview button
  checkFormCompletion();
}
