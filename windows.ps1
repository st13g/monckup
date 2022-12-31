$uri = "http://localhost:3000/users"
$name = "Cristian Delgado"
$type = "Documents"
$city = "Lima"

$os = "Windows"
$pattern = "ERR"
$directory = "C:\Program Files (x86)\Cobian Backup 11\Logs"
$status = "0"
$ip = $ipAddress = (Get-WmiObject -Class Win32_NetworkAdapterConfiguration | Where-Object {$_.IPEnabled}).IPAddress[0]
$user = $env:USERNAME
$pcname = (Get-WmiObject -Class Win32_ComputerSystem).Name



# Get the last file created in the directory
$lastFile = (Get-ChildItem $directory | Sort-Object LastWriteTime | Select-Object -Last 1)

# Check if a file was found
if ($lastFile) {
    # Read the contents of the file
    $contents = Get-Content $lastFile.FullName

    # Check if the pattern is found in the file
    if ($contents -cmatch $pattern) {
        $status = "1"
        Write-Output "Backup with Errors"
        Invoke-WebRequest -Method POST -Uri $uri -Body (ConvertTo-Json @{city = $city; name = $name;hostname = $pcname; user = $user; ip = $ip;os=$os; type = $type; status = $status } ) -ContentType "application/json"
    } else {
        Write-Output "Backup Succeded"
        Invoke-WebRequest -Method POST -Uri $uri -Body (ConvertTo-Json @{city = $city; name = $name;hostname = $pcname; user = $user; ip = $ip;os=$os; type = $type; status = $status } ) -ContentType "application/json"
    }
}
