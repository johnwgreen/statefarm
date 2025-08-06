export default function decorate(block) {
  const urlParams = new URLSearchParams(window.location.search);
  const agentNumber = urlParams.get('agent');

  block.innerHTML = ''; // Clears the existing content of the block

  // Create container for steps
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

  // Helper to create a person card with image and radio button
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

  // Add cards
  if (agentNumber !== null) {
    radioButtonsContainer.append(createPersonCard(
      'William Frank',
      'https://s7d1.scene7.com/is/image/ADBDEMO/William Frank?$Responsive$',
      'ADBDEMO/William Frank',
    ));
    radioButtonsContainer.append(createPersonCard(
      'William Frank',
      'https://s7d1.scene7.com/is/image/ADBDEMO/William Frank-3?$Responsive$',
      'ADBDEMO/William Frank-3',
    ));
    radioButtonsContainer.append(createPersonCard(
      'William Frank',
      'https://s7d1.scene7.com/is/image/ADBDEMO/William Frank-1?$Responsive$',
      'ADBDEMO/William Frank-1',
    ));
    radioButtonsContainer.append(createPersonCard(
      'No Picture',
      'https://s7d1.scene7.com/is/image/ADBDEMO/blank1?$Responsive$',
      'ADBDEMO/blank1',
    ));
  } else {
    radioButtonsContainer.append(createPersonCard(
      'David Mordis',
      'https://s7d1.scene7.com/is/image/ADBDEMO/David Mordis?$Responsive$',
      'ADBDEMO/David Mordis',
    ));
    radioButtonsContainer.append(createPersonCard(
      'David Mordis',
      'https://s7d1.scene7.com/is/image/ADBDEMO/David Mordis-3?$Responsive$',
      'ADBDEMO/David Mordis-3',
    ));
    radioButtonsContainer.append(createPersonCard(
      'David Mordis',
      'https://s7d1.scene7.com/is/image/ADBDEMO/David Mordis-1?$Responsive$',
      'ADBDEMO/David Mordis-1',
    ));
    radioButtonsContainer.append(createPersonCard(
      'No Picture',
      'https://s7d1.scene7.com/is/image/ADBDEMO/blank1?$Responsive$',
      'ADBDEMO/blank1',
    ));
  }

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

  if (agentNumber !== null) {
    const option1 = document.createElement('option');
    option1.value = '1';
    option1.textContent = '4950 W Craig Rd Ste B5, Las Vegas';
    option1.selected = true;
    select.append(option1);
  } else {
    const option2 = document.createElement('option');
    option2.value = '2';
    option2.textContent = '5777 W Century Blvd Suite 665, Los Angeles, CA';
    select.append(option2);
  }
  dropdownLabel.append(select);
  formControlsDiv.append(dropdownLabel);

  // Company input
  const companyLabel = document.createElement('label');
  companyLabel.textContent = 'Company: ';
  const companyInput = document.createElement('input');
  companyInput.type = 'text';
  companyInput.id = 'company';
  companyLabel.append(companyInput);
  formControlsDiv.append(companyLabel);

  // Title input
  const titleLabel = document.createElement('label');
  titleLabel.textContent = 'Title: ';
  const titleInput = document.createElement('input');
  titleInput.type = 'text';
  titleInput.id = 'title';
  titleInput.setAttribute('maxlength', '30');
  titleLabel.append(titleInput);
  formControlsDiv.append(titleLabel);

  // Designation input
  const designationLabel = document.createElement('label');
  designationLabel.textContent = 'Designation: ';
  const designationInput = document.createElement('input');
  designationInput.type = 'text';
  designationInput.id = 'designation';
  designationLabel.append(designationInput);
  formControlsDiv.append(designationLabel);

  // Phone input
  const phoneLabel = document.createElement('label');
  phoneLabel.textContent = 'Phone: ';
  const phoneInput = document.createElement('input');
  phoneInput.type = 'text';
  phoneInput.id = 'phone';
  phoneLabel.append(phoneInput);
  formControlsDiv.append(phoneLabel);

  // License number input
  const licenseLabel = document.createElement('label');
  licenseLabel.textContent = ((agentNumber !== null) ? 'License Number: ' : 'License Number*: ');
  const licenseInput = document.createElement('input');
  licenseInput.type = 'text';
  licenseInput.id = 'license';
  licenseLabel.append(licenseInput);
  formControlsDiv.append(licenseLabel);

  // Message
  const messageLabel = document.createElement('label');
  messageLabel.textContent = 'Select a Message:';
  const messageSelect = document.createElement('select');
  messageSelect.name = 'message';
  messageSelect.id = 'message-select';
  const messageOption1 = document.createElement('option');
  messageOption1.value = '1';
  messageOption1.textContent = 'No Message';
  messageOption1.selected = true;
  messageSelect.append(messageOption1);

  const messageOption2 = document.createElement('option');
  messageOption2.value = '2';
  messageOption2.textContent = 'Just taking a moment';
  messageSelect.append(messageOption2);

  const messageOption3 = document.createElement('option');
  messageOption3.value = '3';
  messageOption3.textContent = 'Additional Message';
  messageSelect.append(messageOption3);

  messageLabel.append(messageSelect);
  formControlsDiv.append(messageLabel);

  // Image
  const imageLabel = document.createElement('label');
  imageLabel.textContent = 'Select an Image:';
  const imageSelect = document.createElement('select');
  imageSelect.name = 'image';
  imageSelect.id = 'image-select';
  const imageOption1 = document.createElement('option');
  imageOption1.value = '1';
  imageOption1.textContent = 'No Image';
  imageOption1.selected = true;
  imageSelect.append(imageOption1);

  const imageOption2 = document.createElement('option');
  imageOption2.value = '2';
  imageOption2.textContent = 'Naional Parks';
  imageSelect.append(imageOption2);
  imageLabel.append(imageSelect);
  formControlsDiv.append(imageLabel);

  // upload Button
  const uploadLabel = document.createElement('label');
  uploadLabel.textContent = 'Upload';
  const uploadInput = document.createElement('input');
  uploadInput.type = 'file';
  uploadLabel.append(uploadInput);
  formControlsDiv.append(uploadLabel);

  // Preview button (Next)
  const previewButton = document.createElement('button');
  previewButton.type = 'button';
  previewButton.textContent = 'Preview';
  previewButton.className = 'preview-button';
  previewButton.disabled = true;

  formControlsDiv.append(previewButton);
  form.append(formControlsDiv);

  step1.append(form);
  container.append(step1);

  // --- Step 2: Preview and approval ---
  const step2 = document.createElement('div');
  step2.className = 'step step-2';

  // Preview container
  const previewContainer = document.createElement('div');
  previewContainer.id = 'review';
  step2.append(previewContainer);

  // Approval checkbox and add button container
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

  // Add to cart button
  const addButton = document.createElement('button');
  addButton.type = 'button';
  addButton.textContent = 'Add to cart';
  addButton.className = 'preview-button';
  addButton.disabled = true;

  approveDiv.appendChild(addButton);
  step2.append(approveDiv);

  // Back button to go back to Step 1
  const backButton = document.createElement('button');
  backButton.type = 'button';
  backButton.textContent = 'Back';
  backButton.className = 'preview-button';
  backButton.style.marginTop = '1rem';

  step2.append(backButton);

  container.append(step2);

  // --- Event handling ---

  // Enable preview button if image and office are selected
  const checkFormCompletion = () => {
    const isImageSelected = form.querySelector('input[name="designOption"]:checked') !== null;
    const isOfficeSelected = select.value !== '';
    const isLicense = ((agentNumber !== null ? true : licenseInput.value !== ''));
    previewButton.disabled = !(isImageSelected && isOfficeSelected && isLicense);
  };

  form.querySelectorAll('input[name="designOption"]').forEach((radio) => radio.addEventListener('change', checkFormCompletion));
  select.addEventListener('change', checkFormCompletion);
  licenseInput.addEventListener('change', checkFormCompletion);

  // Show Step 2 with preview on previewButton click
  previewButton.addEventListener('click', () => {
    // Build the preview image URL
    const newLine = '%5Cline%20';
    const selectedOption = form.querySelector('input[name="designOption"]:checked');
    const selectedOffice = select.value;
    const imageURL = 'https://s7d1.scene7.com/is/image/ADBDEMO/mailing-standard?';
    const pictureURL = `$picture=${selectedOption.value}&`;
    let agentName = '$agentBlock=';
    const companyName = companyInput.value;
    let address = '';
    const phoneNumber = phoneInput.value;
    const licenseNumber = licenseInput.value;
    let titleText = titleInput.value;
    const designationText = designationInput.value;
    const selectedMessage = messageSelect.value;
    let messageOutput = '';

    if (agentNumber !== null) agentName = '$agentBlock=William Frank';
    else agentName = '$agentBlock=David Mordis';

    if (companyName !== '') agentName = `${agentName} ${companyName}`;

    if (titleText !== '' && designationText !== '') {
      titleText = `${newLine} ${titleText} ${designationText}`;
    } else if (titleText !== '' && designationText === '') {
      titleText = `${newLine}${titleText}`;
    } else if (titleText === '' && designationText !== '') {
      titleText = `${newLine}${designationText}`;
    } else {
      titleText = '';
    }
    agentName += titleText;

    switch (selectedOffice) {
      case '1':
        address = `${newLine}4950 W Craig Rd Ste B5${newLine}Las Vegas, NV 89130`;
        break;
      case '2':
        address = `${newLine}5777 W Century Blvd Suite 665${newLine}Los Angeles, CA 90045`;
        break;
      default:
        address = '';
    }
    agentName += address;

    if (phoneNumber !== '') agentName = `${agentName}${newLine}${phoneNumber}`;
    if (licenseNumber !== '') agentName = `${agentName}${newLine}License %23${licenseNumber}`;

    // get select
    switch (selectedMessage) {
      case '1':
        messageOutput = '';
        break;
      case '2':
        messageOutput = `Just taking a moment${newLine}to let you know how${newLine}much I appreciate${newLine}your business`;
        break;
      case '3':
        messageOutput = 'This is an additional message that could be selected';
        break;
      default:
        messageOutput = '';
        break;
    }
    messageOutput = `&$message=${messageOutput}`;

    let imageOutput = '';
    // get select
    switch (imageSelect.value) {
      case '1':
        imageOutput = 'ADBDEMO/blank%20labels';
        break;
      case '2':
        imageOutput = 'ADBDEMO/national%20parks';
        break;
      default:
        imageOutput = '';
        break;
    }
    imageOutput = `&$labelImage=${imageOutput}`;
    previewContainer.innerHTML = `<img src="${imageURL}${pictureURL}${agentName}${messageOutput}${imageOutput}">`;

    // Switch steps visibility
    step1.classList.remove('active-step');
    step2.classList.add('active-step');

    // Reset approval checkbox and hide addButton
    approveCheckbox.checked = false;
  });

  // Back button logic
  backButton.addEventListener('click', () => {
    step2.classList.remove('active-step');
    step1.classList.add('active-step');
  });

  // Show/hide add button based on checkbox
  approveCheckbox.addEventListener('change', () => {
    addButton.disabled = !addButton.disabled;
  });

  // Add to cart button feedback
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

  // Initial check to set previewButton disabled
  checkFormCompletion();
}
