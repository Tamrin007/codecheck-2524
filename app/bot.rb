class Bot

  def initialize(input)
    @command = input[:command]
    @data = input[:data]
    @hash
  end

  attr_accessor :command

  attr_accessor :data

  attr_accessor :hash

  def convertToAscii(string)
    ascii = ""
    string.each_char do |char|
      ascii += char.ord.to_s
    end
    return ascii
  end

  def checkDigits(num)
    if num.length > 21 then
      num = scientificNotation(num.to_i)
	  num.slice!(/.\./)
	  nums = num.split("e+")
      num = nums.join
    end
    return num
  end

  def generateHash()
    ascii_command = ""
    ascii_data = ""
    ascii_command = checkDigits(convertToAscii(@command))
    ascii_data = checkDigits(convertToAscii(@data))
    @hash = (ascii_command.to_i + ascii_data.to_i).to_s(16)
  end

  # Convert the number into scientific notation with 16 digits after "."
  # If power of e is greater than 20, get the number between "." and "e"
  # Else return the number itself
  def scientificNotation(num)
    data = "%.16e" % num
    result = (data.split("e+")[1].to_i() > 20) ? (data): (num)
    return result
  end

end
