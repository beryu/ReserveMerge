(function(){
    var isReserved = false,
        isMergeStarted = false,
        isMerged = false,
        mergeButtonEnabledLabel = 'Merge when passing all check',
        mergeButtonDisabledLabel = 'Cancel merge when passing all check';
    
    var layoutReserveMergeButton = function () {
        if (document.getElementById('blk-reserve-merge')) {
        	return;
        }

        // Layout reserve merge button
        var button = document.createElement('button');
        button.className = 'btn';
        button.type = 'button';
        button.style.marginLeft = '15px';
        button.id = 'blk-reserve-merge';
        button.innerHTML = mergeButtonEnabledLabel;
        button.addEventListener('click', function () {
            isReserved = !isReserved;
            reservedStatusChangeHandler();
        }, false);
        var mergeMessageElement = document.querySelector('.merge-message');
        if (mergeMessageElement) {
            mergeMessageElement.insertBefore(button, document.querySelector('.js-merge-branch-action').nextSibling);
        }
    };
    
    var reservedStatusChangeHandler = function () {
        var reserveMergeButton = document.getElementById('blk-reserve-merge');
        if (!reserveMergeButton) {
        	return;
        }
        if (isReserved) {
            reserveMergeButton.innerHTML = mergeButtonDisabledLabel;
        } else {
            reserveMergeButton.innerHTML = mergeButtonEnabledLabel;
        }
    };

    document.body.addEventListener("DOMSubtreeModified", function(event) {
        layoutReserveMergeButton();
    	reservedStatusChangeHandler();

        if (!isReserved) {
            return;
        }

        var regexResult = document.body.innerHTML.match('<h4 class="status-heading">All checks have passed</h4>');
        if (!isMergeStarted && regexResult && regexResult.length > 0) {
            isMergeStarted = true;
            document.querySelector('.js-merge-branch-action').click();
        }

        var mergeButtonElement = document.querySelector('.btn-primary[data-disable-with="Merging…"]');
        if (isMergeStarted && !isMerged && mergeButtonElement) {
            isMerged = true;
            mergeButtonElement.click()
        }
    });

    layoutReserveMergeButton();
})();