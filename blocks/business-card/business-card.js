export default function decorate(block) {
  block.innerHTML = '';

  const mainDiv = document.createElement('div');
  mainDiv.className = 'business-card-builder';
  block.append(mainDiv);

  // --- STEP 1: FORM CONTAINER ---
  const step1Container = document.createElement('div');
  step1Container.className = 'step step-1 active-step';

  const form = document.createElement('form');
  form.className = 'my-custom-form';

  const radioButtonsContainer = document.createElement('div');
  radioButtonsContainer.className = 'radio-buttons-container';

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

    cardDiv.addEventListener('click', () => {
      input.checked = true;
      const event = new Event('change');
      input.dispatchEvent(event);
    });

    cardDiv.append(label);
    return cardDiv;
  };

  // Add your agents
  radioButtonsContainer.append(createPersonCard('Sharon Sullivan', 'https://s7d1.scene7.com/is/image/ADBDEMO/Sharon Sullivan?$Responsive$', 'ADBDEMO/Sharon Sullivan'));
  radioButtonsContainer.append(createPersonCard('Sharon Sullivan', 'https://s7d1.scene7.com/is/image/ADBDEMO/Sharon Sullivan-3?$Responsive$', 'ADBDEMO/Sharon Sullivan-3'));
  radioButtonsContainer.append(createPersonCard('Sharon Sullivan', 'https://s7d1.scene7.com/is/image/ADBDEMO/Sharon Sullivan-1?$Responsive$', 'ADBDEMO/Sharon Sullivan-1'));
  radioButtonsContainer.append(createPersonCard('No Picture', 'https://s7d1.scene7.com/is/image/ADBDEMO/blank1?$Responsive$', 'ADBDEMO/blank1'));

  form.append(radioButtonsContainer);

  const formControlsDiv = document.createElement('div');
  formControlsDiv.className = 'form-controls';

  const select = document.createElement('select');
  select.name = 'office';
  select.id = 'office-select';
  select.required = true;

  const option1 = new Option('541 S York Street, Elmhurst', '1', true, true);
  const option2 = new Option('447 North York Street, Elmhurst', '2');
  select.append(option1, option2);

  const labelInput = (labelText, inputId) => {
    const label = document.createElement('label');
    label.textContent = labelText;
    const input = document.createElement('input');
    input.type = 'text';
    input.id = inputId;
    label.append(input);
    return { label, input };
  };

  const { label: designationLabel, input: designationInput } = labelInput('Designation: ', 'designation');
  const { label: phoneLabel, input: phoneInput } = labelInput('Phone: ', 'phone');
  const { label: emailLabel, input: emailInput } = labelInput('Email: ', 'email');
  const { label: licenseLabel, input: licenseInput } = labelInput('License Number: ', 'license');

  const dropdownLabel = document.createElement('label');
  dropdownLabel.textContent = 'Select an Office:';
  dropdownLabel.append(select);

  formControlsDiv.append(dropdownLabel, designationLabel, phoneLabel, emailLabel, licenseLabel);

  const previewButton = document.createElement('button');
  previewButton.type = 'button';
  previewButton.textContent = 'Preview';
  previewButton.className = 'preview-button';
  previewButton.disabled = true;
  formControlsDiv.append(previewButton);

  form.append(formControlsDiv);
  step1Container.append(form);
  mainDiv.append(step1Container);

  // --- STEP 2: PREVIEW CONTAINER ---
  const step2Container = document.createElement('div');
  step2Container.className = 'step step-2';

  const previewContainer = document.createElement('div');
  previewContainer.id = 'review';
  step2Container.append(previewContainer);

  const approveDiv = document.createElement('div');
  approveDiv.className = 'form-controls';

  const termsLabel = document.createElement('label');
  termsLabel.textContent = 'By clicking this checkbox, you approve the order as you have entered.';
  const approveCheckbox = document.createElement('input');
  approveCheckbox.type = 'checkbox';
  approveCheckbox.id = 'acceptCheckbox';
  termsLabel.prepend(approveCheckbox);

  const addButton = document.createElement('button');
  addButton.textContent = 'Add to cart';
  addButton.className = 'preview-button';
  addButton.disabled = true;

  approveCheckbox.addEventListener('change', () => {
    addButton.disabled = !addButton.disabled;
  });

  addButton.addEventListener('click', (e) => {
    e.preventDefault();
    
    // Save original button text
    const originalText = addButton.textContent;
    
    // First show loading state
    addButton.textContent = 'Adding...';
    addButton.disabled = true;  // Optional: disable button during process
    
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

  // Back Button
  const backButton = document.createElement('button');
  backButton.type = 'button';
  backButton.textContent = 'Back';
  backButton.className = 'preview-button';
  backButton.addEventListener('click', () => {
    step1Container.classList.add('active-step');
    step2Container.classList.remove('active-step');
  });

  approveDiv.append(termsLabel, addButton, backButton);
  step2Container.append(approveDiv);
  mainDiv.append(step2Container);

  // --- LOGIC ---

  const checkFormCompletion = () => {
    const isImageSelected = form.querySelector('input[name="designOption"]:checked');
    previewButton.disabled = !isImageSelected;
  };

  form.querySelectorAll('input[name="designOption"]').forEach((radio) =>
    radio.addEventListener('change', checkFormCompletion)
  );

  // When Preview is clicked
  previewButton.addEventListener('click', () => {
    const selectedOption = form.querySelector('input[name="designOption"]:checked');
    const selectedOffice = select.value;
    const imageURL = 'https://s7d1.scene7.com/is/image/ADBDEMO/business-card?';
    let pictureURL = selectedOption ? `$picture=${selectedOption.value}&` : '';
    const newLine = '%5Cline%20';
    let agentName = '$text=Sharon Sullivan';

    if (designationInput.value) agentName += newLine + designationInput.value;
    switch (selectedOffice) {
      case '1':
        agentName += newLine + '541 S York Street' + newLine + 'Elmhurst, IL 60126';
        break;
      case '2':
        agentName += newLine + '447 North York Street' + newLine + 'Elmhurst, IL 60126';
        break;
    }
    if (phoneInput.value) agentName += newLine + phoneInput.value;
    if (emailInput.value) agentName += newLine + emailInput.value;
    if (licenseInput.value) agentName += newLine + 'License %23' + licenseInput.value;

    const finalURL = `${imageURL}${pictureURL}${agentName}`;
    previewContainer.innerHTML = `<img src="${finalURL}">`;
    previewContainer.style.display = 'block';

    step1Container.classList.remove('active-step');
    step2Container.classList.add('active-step');
  });
}
