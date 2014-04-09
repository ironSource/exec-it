# remote-exec

## Install

```sh
npm install remote-exec
```

## Run

For example, print uptime for hosts listed in host-list.txt file

```sh
cat host-list.txt | remote-exec -i ~/.ssh/id_rsa -u ec2-user -c uptime
```

## Options

 * ```-c``` command to execute on remote machine
 * ```-p``` ssh port, default is 22
 * ```-l``` username on remote machine, default is ec2-user
 * ```-i``` private key
