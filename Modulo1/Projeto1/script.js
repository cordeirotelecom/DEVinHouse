/* Esta script foi desenvolvida com códigos adicionados para manipulação do itens para armazenar no localStorage */


/* Verificamos se o navegador suporta o Storage */

if (typeof(Storage) !== "undefined") {

    /* Adicionar um novo item da lista */

    const list = document.querySelector('ul');

    document.querySelector(".botao").onclick = novoElemento;
    document.querySelectorAll(".botao")[1].onclick = function() {
        usuarioConfirma = prompt("Tem certeza que deseja excluir as tarefas inseridas e iniciar uma nova lista? (s/n)");
        if (usuarioConfirma == "s") {
            list.innerHTML = '<li class="checado li">Exemplo (clique na tarefa para indicar que está concluída.) </li>';
            localStorage.setItem("list", list.innerHTML);
            fechar(), removerFechar()
        }
    }

    /* Retorna na lista o primeiro elemento do texto inserido, adicionado ao evento de pressionar Enter */

    document.querySelector("#textoInserido").addEventListener("keyup", function(e) { if (e.key == "Enter") { novoElemento() } });
    if (localStorage.getItem("list")) {
        list.innerHTML = localStorage.getItem("list")
    } else {
        list.innerHTML = '<li class="checado li">Exemplo (clique na tarefa para indicar que está concluída) </li>'
    }


    /* Cria o botão Fechar (x) e anexa na lista */

    function fechar() {
        const myNodelist = document.getElementsByTagName("LI");
        for (i = 0; i < myNodelist.length; i++) {
            var span = document.createElement("SPAN");
            var txt = document.createTextNode("\u00D7");
            span.className = "fechar";
            span.appendChild(txt);
            myNodelist[i].appendChild(span);
        }
    }
    fechar();

    /* Ao clicar no botão Fechar (x) retira o item da lista */

    function removerFechar() {
        const fechar = document.getElementsByClassName("fechar");
        for (i = 0; i < fechar.length; i++) {
            fechar[i].onclick = function() {
                this.parentElement.remove();
                localStorage.setItem("list", list.innerHTML.replace(/<span class="fechar">×<\/span>/g, ""));
            }
        }
    }
    removerFechar();

    /* Setar um tempo de 300ms para o clique inserido na lista */

    list.addEventListener('click', function(ev) {
        if (ev.target.tagName == 'LI') {
            if (typeof(diridit) == 'undefined') {
                diridit = setTimeout(checado, 300);
            } else {
                clearTimeout(diridit);
                delete diridit;

            }

            function checado() {
                ev.target.classList.toggle('checado');
                localStorage.setItem("list", list.innerHTML.replace(/<span class="fechar">×<\/span>/g, ""));
                delete diridit;
            }
        }
    }, false);

    /* Inserir novo elemento (item) na lista */

    function novoElemento() {
        var li = document.createElement("li");
        li.className = "li";
        var inputValue = document.getElementById("textoInserido").value.trim().replace(/\s+/, " ");
        var t = document.createTextNode(inputValue);
        li.appendChild(t);
        if (inputValue == '') {
            alert("Por favor preencha algo");
            document.getElementById("textoInserido").value = "";
        } else {
            document.getElementById("minhaLista").appendChild(li);
            document.getElementById("textoInserido").value = "";
            localStorage.setItem("list", list.innerHTML.replace(/<span class="fechar"> ok <\/span>/g, ""));
        }

        var span = document.createElement("SPAN");
        var txt = document.createTextNode("\u00D7");
        span.className = "fechar";
        span.appendChild(txt);
        li.appendChild(span);

        removerFechar();
    }
} else
    alert("Este navegador não suporta o uso do Storage");
