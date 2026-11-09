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

### Firebase Hosting (produção)

**No ar em:** https://www.transportadorarhl.com.br (projeto Firebase `transportadora-rhl`, conta gustavosecondin@gmail.com)

Endereços: `www.transportadorarhl.com.br` é o site; `transportadorarhl.com.br` redireciona para o `www`;
`transportadora-rhl.web.app` é o endereço padrão do Firebase. DNS na Locaweb: `www` CNAME → `transportadora-rhl.web.app`,
raiz A → `199.36.158.100` e TXT `hosting-site=transportadora-rhl`.

Para publicar uma nova versão, na pasta do projeto:

```bash
firebase deploy --only hosting
```

A configuração está em `firebase.json` (pasta raiz como `public`, com `.git`, `.claude`, `README.md` e `CNAME` excluídos) e o projeto em `.firebaserc`.
Domínio personalizado: Firebase Console → Hosting → Domínios personalizados. O DNS fica na Locaweb (`ns1/ns2/ns3.locaweb.com.br`).

### GitHub Pages (espelho)

O repositório `secondin2/transportadorarhlpublico` também publica em https://secondin2.github.io/transportadorarhlpublico/ a cada push na `main`.
O domínio `www.transportadorarhl.com.br` não pôde ser vinculado ao GitHub Pages porque continua reivindicado pelo
repositório antigo `transportadorarh/transportadorarhl` (outra conta), mesmo com o domínio verificado na conta `secondin2`.
Por isso a produção está no Firebase. O arquivo `CNAME` foi mantido para o caso de o domínio ser liberado no futuro.

É um site 100% estático e também funciona em qualquer outra hospedagem (Hostinger, HostGator, cPanel, Netlify, Vercel, Cloudflare Pages). Não precisa de PHP nem banco de dados.

## Rodar localmente

```bash
python -m http.server 8765
```

Depois abra `http://localhost:8765`.
