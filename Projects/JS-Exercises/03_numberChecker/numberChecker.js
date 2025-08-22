function numberChecker(number) {
  switch (number)
  {
    case 6:
        return false;
    case 9:
        return false;
    case 10:
        return true;
    case 1000:
        return true;
  }
  return false;
}

// Do not edit below this line
module.exports = numberChecker;