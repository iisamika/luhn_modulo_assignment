class FinnishBankNumber {
    constructor(shortCode){
        this.shortCode = shortCode;
    }

    machineReadableFormat(shortCode)   {
        let splitShortCode = shortCode.replace(/-/g,'').split("");
        let checkSplitCode = splitShortCode.slice(0, 1).toString();
        let bankID = ["1","2","3","6","8"];
        let bankID2 = ["4","5"];

        if(bankID.includes(checkSplitCode))  {
            for(let i = splitShortCode.length; i <= 13; i++)    {
                splitShortCode.splice( 6, 0, "0" );
            }
            let joinShortCode = splitShortCode.join("");
            return this.onChange(joinShortCode);
        }
        else if(bankID2.includes(checkSplitCode))   {
            for(let i = splitShortCode.length; i <= 13; i++)    {
                splitShortCode.splice( 7, 0, "0" );
            }
            let joinShortCode = splitShortCode.join("");
            return this.onChange(joinShortCode);
        }
        else    {
            console.log("Incorrect bank account number!");
            console.log("Incorrect check digit!");
        }
    }

    findBankName(newTinyCode)   {
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
        return this.bankIdentifier(bankName[newTinyCode] || bankName['default']);
    }

    bankIdentifier(bankName)   {
        console.log("Bank name: " + bankName);
    }

    onChange(joinShortCode) {
        let fullCode = joinShortCode;
        let partCode = fullCode.substring(0, fullCode.length - 1);
        console.log(fullCode);
        console.log(partCode);
        this.checkValidity(fullCode);
        return this.luhnCalculate(partCode);
    }

    luhnCalculate(partCode)   {
        let checkSum = this.luhnCheckSum(partCode + "0");
        return this.addCheckDigit(checkSum == 0 ? 0 : 10 - checkSum);
    }

    luhnCheckSum(code) {
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

    addCheckDigit(checkSum)    {
        let checkDigit = checkSum;
        console.log(checkDigit, "Validation number");
    }

    checkValidity(fullCode)    {
        let isValid = this.luhnValidate(fullCode);
        let htmlNoCode = "&nbsp;";
        let htmlValid = "This code is valid.";
        let htmlInValid = "This code is not valid.";
        console.log((fullCode == "") ? htmlNoCode : isValid ? htmlValid : htmlInValid);
    }


    luhnValidate(fullCode)    {
        return this.luhnCheckSum(fullCode) == "0";
    }
}

class FinnishBankAccount    {
    constructor(tinyCode)   {
        this.tinyCode = tinyCode;
        this.slicedTinyCode = tinyCode.slice(0, 1);
        this.newTinyCode = tinyCode.replace(/-/g,'').split("");
        if(this.newTinyCode[0] == "3")    {
            this.sendThisCode = this.newTinyCode.slice(0, 2).join("");
            this.account = new FinnishBankNumber(tinyCode).machineReadableFormat(tinyCode);
            this.callMethod2 = new FinnishBankNumber(this.sendThisCode).findBankName(this.sendThisCode);        
        }
        else if(this.newTinyCode[0] == "7" || this.newTinyCode[0] == "9" || this.newTinyCode[0] == "0" || this.newTinyCode.some(isNaN))    {
            try {
                throw new Error("Incorrect bank Identification number or NaN in account number");
            } catch (error) {
                console.log(error.message);
            }
        }
        else    {
            this.sendThisCode = this.newTinyCode.slice(0, 1).join("");
            this.account = new FinnishBankNumber(tinyCode).machineReadableFormat(tinyCode);
            this.callMethod2 = new FinnishBankNumber(this.sendThisCode).findBankName(this.sendThisCode.toString());
        }
    }
}

let account = new FinnishBankAccount("123456-785");