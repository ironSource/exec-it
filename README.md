# exec-it

## Install

```sh
npm install exec-it
```

## Run

For example, print uptime for hosts listed in host-list.txt file

```sh
cat host-list.txt | exec-it -c uptime
```

## Options

 * ```-c``` command to execute on remote machine
 * ```-f``` read command from a file, works only if ```-c``` is not specified
 * ```-p``` ssh port, default is 22
 * ```-l``` username on remote machine, default is ec2-user
 * ```-i``` private key, default is ```/a_home_dir/.ssh/id_rsa```
