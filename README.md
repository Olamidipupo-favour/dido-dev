# DiDo

Decentralized donation platform. Donors give on-chain, causes request funds, and
the app reads donations from an indexed subgraph.

Live demo: https://dido.treasureuvietobore.com/

Contract: `0x0290f25EA78E3d85076e085B87787C30567f63f9` on Optimism Sepolia.

## Layout

| Path | What it is |
| ---- | ---------- |
| `frontend/` | Express server with EJS views and static pages |
| `backend/` | Flask REST API with MongoDB and JWT auth |
| `smart_contracts/` | Solidity contracts built with Hardhat |
| `graph/` | The Graph subgraph indexing `Donate` events |

## Stack

- Frontend: Node.js, Express, EJS, Vite
- Backend: Flask, Flask-RESTful, PyMongo, Flask-JWT-Extended, gql
- Contracts: Solidity, Hardhat, OpenZeppelin
- Indexing: The Graph, AssemblyScript
- Network: Optimism Sepolia

## Setup

### Backend

```bash
cd backend
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
flask run
```

Fill in MongoDB credentials, `JWT_SECRET`, `subgraph_key`, and `api-endpoint` in
`.env`.

Routes: `/api/register`, `/api/login`, `/api/ping`, `/api/all-transactions`,
`/api/request_eth`, `/api/my-donations-received`, `/api/my-donations-donated`.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Runs on the port set by the server, defaulting to Express's `3000`.

### Contracts

```bash
cd smart_contracts
npm install
cp .env.example .env
npx hardhat compile
```

Set `DEPLOYER_PRIVATE_KEY` and `ETHERSCAN_API_KEY` in `.env`. Both are read from
the environment and are never committed.

### Subgraph

```bash
cd graph
npm install
npm run codegen
npm run build
npm run deploy
```

The subgraph points at the deployed DiDo contract and its `Donate` event.

## Notes

This was built for a hackathon. The contract lives on a testnet and the demo is
not a production deployment.

Never commit `.env` files or private keys. Use the provided `.env.example` files.
