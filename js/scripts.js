class Data  {
    constructor(shortCode)   {
        this.shortCode = shortCode;
    }

    addZeroes() {
        let splitShortCode = this.shortCode.split("");
        let checkSplitCode = splitShortCode.slice(0, 1).toString();

        if(checkSplitCode === "1"|| checkSplitCode === "2"|| checkSplitCode === "3"|| checkSplitCode === "6"|| checkSplitCode === "8")  {
            for(let i = splitShortCode.length; i <= 13; i++)    {
                splitShortCode.splice( 6, 0, "0" );
            }
            let joinShortCode = splitShortCode.join("");
            return onChange(joinShortCode);
        }
        else if(checkSplitCode === "4"|| checkSplitCode === "5")   {
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
}

class Banks {
    constructor(bankNumberData) {
        this.bankNumberData = bankNumberData;
    }

    checkWhichBank()    {
        let splitShortCode = this.bankNumberData.split("");
        let checkBankNumber = splitShortCode.slice(0, 2);
        switch  (checkBankNumber[0])   {
            case "1":
            case "2":   {
                let bankName = "Nordea";
                bankIdentifier(bankName);
                break;
            }
            case "3":   {
                switch  (checkBankNumber[1])    {
                    case "1":   {
                        let bankName = "Handelsbanken";
                        bankIdentifier(bankName);
                        break;
                    }
                    case "3":   {
                        let bankName = "Skandinaviska Enskilda Banken";
                        bankIdentifier(bankName);
                        break;
                    }
                    case "4":   {
                        let bankName = "Danske Bank";
                        bankIdentifier(bankName);
                        break
                    }
                    case "6":   {
                        let bankName = "Tapiola Pankki";
                        bankIdentifier(bankName);
                        break
                    }
                    case "7":   {
                        let bankName = "DnB NOR Bank ASA";
                        bankIdentifier(bankName);
                        break
                    }
                    case "8":   {
                        let bankName = "Swedbank";
                        bankIdentifier(bankName);
                        break
                    }
                    case "9":   {
                        let bankName = "S-Pankki";
                        bankIdentifier(bankName);
                        break
                    }
                    default:    {
                        let bankName = "Bank identifying number is incorrect!";
                        bankIdentifier(bankName);
                        break
                    }
                }
                break;
            }
            case "4":   {
                let bankName = "Säästöpankki, Paikallisosuuspankki tai Aktia";
                bankIdentifier(bankName);
                break;
            }
            case "5":   {
                let bankName = "Osuuspankki, OKO tai Okopankki";
                bankIdentifier(bankName);
                break;
            }
            case "6":   {
                let bankName = "Ålandsbanken";
                bankIdentifier(bankName);
                break;
            }
            case "8":   {
                let bankName = "Sampo Pankki";
                bankIdentifier(bankName);
                break;
            }
            default:    {
                let bankName = "Bank identifying number is incorrect!";
                bankIdentifier(bankName);
                break
            }
        }
    }
}

function bankIdentifier(bankName)   {
    document.getElementById('bankName').innerHTML = "Name of the bank: " + (bankName);
}

function buttonPressed()    {
    let inputShortCode = document.form1.shortCode.value.replace(/-/g,'');
    let sendShortCode = new Data(inputShortCode);
    let sendBankCode = new Banks(inputShortCode);

    sendShortCode.addZeroes();
    sendBankCode.checkWhichBank();
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
    let htmlValid = "<b><font color=green>This code is valid.</font></b>";
    let htmlInValid = "<b><font color=red>This code is not valid.</font></b>";
    document.getElementById('isValid').innerHTML = (fullCode == "") ? htmlNoCode : isValid ? htmlValid : htmlInValid
}