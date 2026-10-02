# Clone do Airbnb - Frontend em Angular 17

## Visão Geral

Este projeto é uma implementação frontend moderna de um clone do Airbnb construído com Angular 17. Oferece uma interface completa para inquilinos e proprietários, permitindo buscar propriedades, fazer reservas e gerenciar listagens com um fluxo de trabalho em etapas semelhante à plataforma original.

Acesse também o repositório do backend: [Airbnb-Backend](https://github.com/MatheusOtenio/Airbnb-Clone_Spring-Back)

## Tecnologias Utilizadas

- **Angular 17**: Versão mais recente com arquitetura de componentes autônomos
- **TypeScript**: Para desenvolvimento com código tipado
- **PrimeNG**: Biblioteca de componentes UI
- **Font Awesome**: Suporte a ícones

## Arquitetura do Projeto

### Estrutura Principal

- **Core**: Funcionalidades essenciais (autenticação, interceptadores)
- **Layout**: Componentes UI compartilhados (navbar, toast, avatar)
- **Tenant**: Recursos para inquilinos
  - Busca de propriedades
  - Visualização de detalhes
  - Calendário de reservas
- **Landlord**: Recursos para proprietários
  - Painel de gerenciamento
  - Fluxo de criação de propriedades em etapas
- **Shared**: Componentes reutilizáveis

### Gerenciamento de Estado

- Usa gerenciamento baseado em signals do Angular 17
- Serviços mantêm estado com padrões reativos
- Componentes usam efeitos para reagir a mudanças

### Design de Componentes

- Componentes autônomos com responsabilidades claras
- Padrão Input/Output para comunicação
- Fluxos baseados em etapas para processos complexos
- Formulários reativos com validação

### Integração com API

- Serviços HTTP para comunicação com backend
- Interceptadores para autenticação e tratamento de erros
- Objetos de estado para controlar carregamento/sucesso/erro

## Funcionalidades Principais

### Autenticação

- Login/cadastro de usuários
- Gerenciamento de sessão com autenticação por token
- Controle de acesso baseado em funções
- Gerenciamento de perfil

### Busca de Propriedades

- Processo de busca em múltiplas etapas:
  1. Seleção de localização com mapa
  2. Seleção de datas
  3. Especificação de hóspedes e requisitos
- Filtros diversos
- Resultados responsivos

### Gerenciamento de Propriedades (Proprietário)

- Painel para visualizar todas as propriedades
- Criação de propriedades em etapas:
  1. Seleção de categoria
  2. Localização
  3. Detalhes (quartos, comodidades)
  4. Upload e gerenciamento de fotos
  5. Descrição e título
  6. Configuração de preços
- Edição e exclusão de propriedades
- Gerenciamento de reservas

### Sistema de Reservas (Inquilino)

- Visualização detalhada de propriedades
- Seleção de datas para reserva
- Confirmação e gerenciamento de reservas
- Histórico de reservas

### Recursos de UI/UX

- Design responsivo
- Notificações toast
- Estados de carregamento e tratamento de erros
- Navegação baseada em etapas
- Interface moderna inspirada no Airbnb

## Configuração de Desenvolvimento

### Pré-requisitos

- Node.js (v16+)
- npm ou yarn
- Angular CLI (v17)

### Instalação

```bash
# Clonar o repositório
git clone <url-repositório>

# Navegar para o diretório do projeto
cd airbnb-clone-angular

# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
ng serve
```

### Build para Produção

```bash
ng build --configuration production
```

## Estrutura do Projeto

```
src/
├── app/
│   ├── core/
│   │   ├── auth/
│   │   ├── model/
│   │   └── interceptors/
│   ├── layout/
│   │   ├── navbar/
│   │   │   └── category/
│   │   └── toast/
│   ├── tenant/
│   │   ├── search/
│   │   ├── display-listing/
│   │   └── book-date/
│   ├── landlord/
│   │   ├── properties/
│   │   ├── properties-create/
│   │   │   └── step/
│   │   └── model/
│   └── shared/
│       └── footer-step/
├── assets/
└── environments/
```

## Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para enviar um Pull Request.

## Referências

[@code-cake](https://www.youtube.com/@code-cake)
[Angular](https://angular.dev/overview)
[PrimeNG](https://www.primefaces.org/primeng/)
[Font Awesome](https://fontawesome.com/)
[RxJS](https://rxjs.dev/)
[Angular Signals](https://angular.io/guide/signals)
[Dynamic Dialog](https://www.primefaces.org/primeng/showcase/#/dynamicdialog)
