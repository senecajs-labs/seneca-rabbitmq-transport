docker-machine start default;
docker pull rabbitmq;
docker run -d --hostname my-rabbit --name seneca-rabbit -p 5672:5672 rabbitmq;
VBoxManage controlvm "default" natpf1 "tcp-port5672,tcp,,5672,,5672" &>/dev/null;