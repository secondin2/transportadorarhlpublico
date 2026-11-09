# Site — Transportadora de Cargas RHL

Site estático (HTML + CSS + JS puro, sem dependências) com botão flutuante de WhatsApp e formulário de cotação.

## Estrutura

```
index.html          Página única com todas as seções
css/style.css       Estilos (paleta: azul-marinho + amarelo)
js/main.js          Menu, contadores, animações, máscara de telefone e formulário
assets/img/         Imagens (banners, caminhão, favicon)
```

## Configuração rápida

Tudo o que normalmente muda fica no topo de `js/main.js`, no objeto `CONFIG`:

| Chave | O que faz |
|---|---|
| `whatsappNumber` | Número com DDI + DDD, só dígitos (hoje: `5511917754241`) |
| `whatsappDefaultMessage` | Mensagem pré-preenchida dos botões de WhatsApp |
| `formMode` | `'whatsapp'` abre o WhatsApp com os dados do formulário; `'email'` envia por e-mail via FormSubmit |
| `emailEndpoint` | Usado apenas no modo `'email'` |

### Modo e-mail (FormSubmit)

1. Troque `formMode` para `'email'`.
2. Confirme o e-mail em `emailEndpoint` (`https://formsubmit.co/ajax/SEU@EMAIL`).
3. No primeiro envio real, o FormSubmit manda um e-mail de ativação para esse endereço. Depois de confirmar, os envios passam a chegar normalmente.

## Seções

Início · Números · Sobre (missão e visão) · Serviços · Diferenciais · Cobertura · Contato (formulário + mapa) · Rodapé.

## Conteúdo a validar com o cliente

- **Serviços**: os quatro cards (carga lotação, fracionada, distribuição/transferência e logística personalizada) são sugestões baseadas no segmento. O site atual não lista serviços; confirmar com a RHL.
- **Números**: 1.500 clientes, 20 estados, 100 caminhões e 50 motoristas foram copiados do site atual.
- **Imagens**: os banners e o caminhão foram reaproveitados do site atual. Substituir por fotos próprias em `assets/img/` quando houver.
- **Mapa**: o embed do Google Maps usa o endereço de Cajamar. Se preferir, troque pelo link "Incorporar mapa" gerado no Google Maps.
- **URL canônica e Open Graph**: apontam para `https://www.transportadorarhl.com.br/`. Ajustar se o domínio mudar.

## Publicação

É um site 100% estático: basta enviar os arquivos para qualquer hospedagem (Hostinger, HostGator, cPanel, Netlify, Vercel, GitHub Pages, Cloudflare Pages). Não precisa de PHP nem banco de dados.

## Rodar localmente

```bash
python -m http.server 8765
```

Depois abra `http://localhost:8765`.
