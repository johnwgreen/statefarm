export default function decorate(block) {
  block.innerHTML = ''; // Clears the existing content of the block

  // Create the main container div
  const mainDiv = document.createElement('div');
  block.append(mainDiv);

  // ---
  // Create the form element
  const form = document.createElement('form');
  form.className = 'my-custom-form';

  // Add radio buttons with images
  const radioButtonsContainer = document.createElement('div');
  radioButtonsContainer.className = 'radio-buttons-container';

  // Helper function to create a person's selection card
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

    // Add click handler to the card to select the radio button
    cardDiv.addEventListener('click', () => {
      input.checked = true;
      // Trigger change event to update form completion status
      const event = new Event('change');
      input.dispatchEvent(event);
    });

    cardDiv.append(label);
    return cardDiv;
  };

  // Populate using the helper function
  radioButtonsContainer.append(createPersonCard(
    'Don Stolper',
    'https://s7d1.scene7.com/is/image/ADBDEMO/Don Stolper-1',
    'ADBDEMO/Don Stolper-1',
  ));
  radioButtonsContainer.append(createPersonCard(
    'Brian Stolper',
    'https://s7d1.scene7.com/is/image/ADBDEMO/Brian%20Stolper?$Responsive$',
    'ADBDEMO/Brian Stolper-1',
  ));
  radioButtonsContainer.append(createPersonCard(
    'Sharon Sullivan',
    'https://s7d1.scene7.com/is/image/ADBDEMO/Sharon Sullivan-1?$Responsive$',
    'Sharon Sullivan-1',
  ));
  radioButtonsContainer.append(createPersonCard(
    'William Frank',
    'https://s7d1.scene7.com/is/image/ADBDEMO/William Frank-1?$Responsive$',
    'ADBDEMO/William Frank-1',
  ));

  form.append(radioButtonsContainer);

  // ---
  // Add a dropdown (select element)
  const formControlsDiv = document.createElement('div');
  formControlsDiv.className = 'form-controls';

  const dropdownLabel = document.createElement('label');
  dropdownLabel.textContent = 'Select an Office:';
  const select = document.createElement('select');
  select.name = 'office';
  select.id = 'office-select';
  select.required = true;

  // First office option (selected by default)
  const option1 = document.createElement('option');
  option1.value = '123';
  option1.textContent = '123 Main Street';
  option1.selected = true; // Set as selected by default
  select.append(option1);

  // Second office option
  const option2 = document.createElement('option');
  option2.value = '424';
  option2.textContent = '424 Hadley Drive, Suite F';
  select.append(option2);

  dropdownLabel.append(select);
  formControlsDiv.append(dropdownLabel);

  // ---
  // Add the 'Preview' button
  const previewButton = document.createElement('button');
  previewButton.type = 'submit';
  previewButton.textContent = 'Preview';
  previewButton.className = 'preview-button';
  previewButton.disabled = true; // Disabled by default (until image is selected)
  formControlsDiv.append(previewButton);

  form.append(formControlsDiv);

  // Append the form to the block
  block.append(form);

  // --
  // Add a preview area
  const previewContainer = document.createElement('div');
  previewContainer.id = 'review';
  block.append(previewContainer);

  // Function to check if form is complete
  const checkFormCompletion = () => {
    const isImageSelected = form.querySelector('input[name="designOption"]:checked') !== null;
    const isOfficeSelected = select.value !== '';
    previewButton.disabled = !(isImageSelected && isOfficeSelected);
  };

  // Add event listeners for form changes
  form.querySelectorAll('input[name="designOption"]').forEach((radio) => {
    radio.addEventListener('change', checkFormCompletion);
  });

  select.addEventListener('change', checkFormCompletion);

  // Add event listener for form submission
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const selectedOption = form.querySelector('input[name="designOption"]:checked');
    const selectedOffice = form.querySelector('#office-select');
    const imageURL = 'https://s7d1.scene7.com/is/image/ADBDEMO/video-background?';
    let pictureURL = '';

    if (selectedOption) {
      pictureURL = `$picture=${selectedOption.value}&`;
    }

    let agentName = '$name=';
    let address = '$address=';
    let phoneNumber = '$phone=';
    let emailAddress = '$email=';

    switch (selectedOffice.value) {
      case '123':
        address = '$address=123 Main Street&$city=St. Paul, MN&$zip=55112-9583&';
        break;
      case '424':
        address = '$address=424 Hadley Drive, Suite F&$city=Manhattan Beach, CA&$zip=90266-1671&';
        break;
      default:
    }

    switch (selectedOption?.value) {
      case 'ADBDEMO/William Frank-1':
        agentName += 'William Frank&';
        phoneNumber += '727.789.1234&';
        emailAddress += 'wfrank@statefarm.com';
        break;
      case 'Sharon Sullivan-1':
        agentName += 'Sharon Sullivan&';
        phoneNumber += '813.235.8521&';
        emailAddress += 'ssullivan@statefarm.com';
        break;
      case 'ADBDEMO/Brian Stolper-1':
        agentName += 'Brian Stolper&';
        phoneNumber += '404.687.5468&';
        emailAddress += 'bstolper@statefarm.com';
        break;
      case 'ADBDEMO/Don Stolper-1':
        agentName += 'Don Stolper&';
        phoneNumber += '305.348.9876&';
        emailAddress += 'dstolper@statefarm.com';
        break;
      default:
    }

    const finalURL = `${imageURL}${pictureURL}${agentName}${address}${phoneNumber}${emailAddress}`;
    previewContainer.innerHTML = `<img src="${finalURL}">`;
    previewContainer.style.display = 'block';
  });
}
