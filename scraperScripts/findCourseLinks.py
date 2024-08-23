import datetime
def scrapeAllUiOCourseLinks():
    pass

def main():
    pass


def convert_time_to_decimal(time_str):
    # Splitt strengen i timer og minutter
    hours, minutes = map(int, time_str.split(':'))
    
    # Kalkuler desimalverdien av minuttene
    minutes_in_decimal = minutes / 60
    
    # Kombiner timer og desimalverdien av minuttene
    decimal_time = hours + minutes_in_decimal
    
    # Formatér med maks 2 desimaler
    formatted_time = f"{decimal_time:.2f}".rstrip('0').rstrip('.')
    
    return formatted_time

# Eksempelbruk
time_str = "08:15"
result = convert_time_to_decimal(time_str)
print(result)  # Output: 8.25

time_str = "08:10"
result = convert_time_to_decimal(time_str)
print(result)  # Output: 8.17

time_str = "08:07"
result = convert_time_to_decimal(time_str)
print(result)  # Output: 8.1
