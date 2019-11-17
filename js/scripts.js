function abstraction(shortCode)   {
    this.shortCode = shortCode;
    
    let machineReadable = function(shortCode) {
        let splitShortCode = shortCode.split("");
        let checkSplitCode = splitShortCode.slice(0, 1).toString();
        let bankID = ["1","2","3","6","8"];
        let bankID2 = ["4","5"];

        if(bankID.includes(checkSplitCode))  {
            for(let i = splitShortCode.length; i <= 13; i++)    {
                splitShortCode.splice( 6, 0, "0" );
            }
            let joinShortCode = splitShortCode.join("");
            return onChange(joinShortCode);
        }
        else if(bankID2.includes(checkSplitCode))   {
            for(let i = splitShortCode.length; i <= 13; i++)    {
                splitShortCode.splice( 7, 0, "0" );
            }
            let joinShortCode = splitShortCode.join("");
            return onChange(joinShortCode);
        }
        else    {
            document.form1.fullCode.value = "Incorrect bank account number!";
            document.form1.partCode.value = "Incorrect bank account number!";
            document.form1.checkDigit.value = "Incorrect check digit!";
        }
    }

    let checkWhichBank = function(checkBankNumber)   {
        let bankName = {
            '1': 'Nordea',
            '2': 'Nordea',
            '31': 'Handelsbanken',
            '33': 'Skandinaviska Enskilda Banken', 
            '34': 'Danske Bank', 
            '36': 'Tapiola Pankki', 
            '37': 'DnB NOR Bank ASA', 
            '38': 'Swedbank',
            '39': 'S-Pankki',
            '4': 'Säästöpankki, Paikallisosuuspankki tai Aktia',
            '5': 'Osuuspankki, OKO tai Okopankki',
            '6': 'Ålandsbanken',
            '8': 'Sampo Pankki',
            'default': 'Bank identifying number is incorrect!'
        };
        return bankIdentifier(bankName[checkBankNumber] || bankName['default']);
    }

    this.bankData = function() {
        machineReadable(shortCode);
        let splitShortCode = shortCode.split("");
        if(splitShortCode[0] == "3")    {
            let checkBankNumber = splitShortCode.slice(0, 2).join("");
            checkWhichBank(checkBankNumber.toString());
        }
        else    {
            let checkBankNumber = splitShortCode.slice(0, 1);
            checkWhichBank(checkBankNumber.toString());
        }
    }
}

function bankIdentifier(bankName)   {
    document.getElementById('bankName').textContent = "Name of the bank: " + (bankName);
}

function buttonPressed()    {
    let inputShortCode = document.form1.shortCode.value.replace(/-/g,'');
    let sendShortCode = new abstraction(inputShortCode);
    sendShortCode.bankData();
}

function luhnCheckSum(code) {
    let len = code.length;
    let parity = len % 2;
    let sum = 0;

    for (let i = len -1; i >= 0; i--)   {
        let d = parseInt(code.charAt(i));
        if(i % 2 == parity) {
            d *=2
        }

        if(d > 9)   {
            d -= 9;
        }

        sum += d;
    }
    return sum % 10;
}

function luhnCalculate(partCode)   {
    let checkSum = luhnCheckSum(partCode + "0");
    return addCheckDigit(checkSum == 0 ? 0 : 10 - checkSum);
}

function luhnValidate(fullCode)    {
    return luhnCheckSum(fullCode) == "0";
}

function addCheckDigit(checkSum)    {
    let checkDigit = checkSum;
    document.form1.checkDigit.value = checkDigit;
}


function onChange(joinShortCode) {
    let fullCode = joinShortCode;
    let partCode = fullCode.substring(0, fullCode.length - 1);
    luhnCalculate(partCode);
    
    document.form1.fullCode.value = fullCode;
    document.form1.partCode.value = partCode;

    checkValidity(fullCode);
}

function checkValidity(fullCode)    {
    let isValid = luhnValidate(fullCode);
    let htmlNoCode = "&nbsp;";
    let htmlValid = "This code is valid.";
    let htmlInValid = "This code is not valid.";
    document.getElementById('isValid').textContent = (fullCode == "") ? htmlNoCode : isValid ? htmlValid : htmlInValid
}