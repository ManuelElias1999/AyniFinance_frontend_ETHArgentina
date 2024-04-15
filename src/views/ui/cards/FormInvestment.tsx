import { Box, Button, Card, CardContent, CardHeader, Grid } from '@mui/material';
import Alert from '@mui/material/Alert';
import { useState, useEffect } from 'react';
import CustomTextField from 'src/@core/components/mui/text-field';
import LinearProgress from '@mui/material/LinearProgress';
import { ethers } from 'ethers'

// Exchange data
const EXCHANGE_CONTRACT = '0xf5d8bbA9C48D6B9Ba37C838e902D2232516445Fa'
const EXCHANGE_ABI = [
  {
    inputs: [],
    stateMutability: 'nonpayable',
    type: 'constructor'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256'
      }
    ],
    name: 'deposit',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'finkaOwner',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'finkaToken',
    outputs: [
      {
        internalType: 'contract IERC20',
        name: '',
        type: 'address'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'usdtCustodial',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'usdtOwner',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'usdtToken',
    outputs: [
      {
        internalType: 'contract IERC20',
        name: '',
        type: 'address'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  }
]

// USDC - ERC20
const USDC_CONTRACT = '0x0FA8781a83E46826621b3BC094Ea2A0212e71B23'
const USDC_ABI = [
  {
    inputs: [],
    stateMutability: 'nonpayable',
    type: 'constructor'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'owner',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'spender',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'value',
        type: 'uint256'
      }
    ],
    name: 'Approval',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'previousOwner',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'newOwner',
        type: 'address'
      }
    ],
    name: 'OwnershipTransferred',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'from',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'to',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'value',
        type: 'uint256'
      }
    ],
    name: 'Transfer',
    type: 'event'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'owner',
        type: 'address'
      },
      {
        internalType: 'address',
        name: 'spender',
        type: 'address'
      }
    ],
    name: 'allowance',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'spender',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256'
      }
    ],
    name: 'approve',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool'
      }
    ],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'account',
        type: 'address'
      }
    ],
    name: 'balanceOf',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'decimals',
    outputs: [
      {
        internalType: 'uint8',
        name: '',
        type: 'uint8'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'spender',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: 'subtractedValue',
        type: 'uint256'
      }
    ],
    name: 'decreaseAllowance',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool'
      }
    ],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'spender',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: 'addedValue',
        type: 'uint256'
      }
    ],
    name: 'increaseAllowance',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool'
      }
    ],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'to',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256'
      }
    ],
    name: 'mint',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'name',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'symbol',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'totalSupply',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'to',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256'
      }
    ],
    name: 'transfer',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool'
      }
    ],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'from',
        type: 'address'
      },
      {
        internalType: 'address',
        name: 'to',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256'
      }
    ],
    name: 'transferFrom',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool'
      }
    ],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'newOwner',
        type: 'address'
      }
    ],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  }
]

function getSignerFront() {
  const provider = new ethers.providers.Web3Provider(window.ethereum)

  return provider.getSigner()
}

declare global {
  interface Window {
    ethereum: any
  }
}

export default function FormInvestment() {
  const [tokens, setTokens] = useState(0)
  const [isConnected, setIsConnected] = useState(false)
  const [network, setNetwork] = useState('')
  const [showAlert, setShowAlert] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleChange = ({ target }) => {
    setTokens(target.value * 10)
  }

  const handleSubmit = async el => {
    el.preventDefault()
    const { target } = el
    const tokens = target[0].value
    console.log({ tokens })

    try {
      const exchangeContract = new ethers.Contract(EXCHANGE_CONTRACT, EXCHANGE_ABI, getSignerFront())
      const usdcContract = new ethers.Contract(USDC_CONTRACT, USDC_ABI, getSignerFront())
      const amount = 0.1 * Math.pow(10, 18)
      const spender = EXCHANGE_CONTRACT

      // request USDC approval
      try {
        const tx = await usdcContract.approve(spender, BigInt(amount))
        await tx.wait()
        console.log('Approval successful')
      } catch (error) {
        console.error('Approval failed:', error)
      }

      setProgress(100);

      // deposit USDC to exchange wallet
      try {
        const transaction = await exchangeContract.deposit(BigInt(amount))
        await transaction.wait()
        console.log('Exchange successful')
      } catch (error) {
        console.error('Exchange failed:', error)
      }
      setProgress(0);
      setShowAlert(true);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    async function checkConnection() {
      if (typeof window.ethereum !== 'undefined') {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
        if (accounts.length > 0) {
          setIsConnected(true)

          const chainId = parseInt(window.ethereum.chainId, 16)
          console.log({ chainId })
          if (chainId === 80001) {
            setNetwork('Polygon')
          } else {
            connectToOptimism()
          }
        }
      }
    }

    checkConnection()
  }, [])

  const connectToOptimism = async () => {
    try {
      await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [
          {
            chainId: '0x13881',
            chainName: 'Polygon L2 Testnet',
            nativeCurrency: {
              name: 'MATIC',
              symbol: 'MATIC',
              decimals: 18
            },
            rpcUrls: ['https://polygon-mumbai.g.alchemy.com/v2/WjPQl_zihKJwHPqgBIC0w7MnLOxfA-aF'],
            blockExplorerUrls: ['https://mumbai.polygonscan.com/']
          }
        ]
      })
    } catch (error) {
      console.error('Error connecting to Optimism:', error)
    }
  }

  return (
    <Card>
      {isConnected ? (
        <>
          <CardHeader title={'Invertir (' + network + ')'} />

          <CardContent>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={5}>
                <Grid item xs={12}>
                  <CustomTextField
                    fullWidth
                    label='Monto a invertir  (USDT)'
                    placeholder='123'
                    type='number'
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <CustomTextField fullWidth type='number' label='Tokens a obtener (FNK)' disabled value={tokens} />
                </Grid>
                <Grid item xs={12}>
                  <Box
                    sx={{
                      gap: 5,
                      display: 'flex',
                      flexWrap: 'wrap',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <Button type='submit' variant='contained'>
                      Invertir
                    </Button>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        '& a': { color: 'primary.main', textDecoration: 'none' }
                      }}
                    >
                      {/* <Typography sx={{ mr: 2 }}>Already have an account?</Typography>
                  <Link href='/' onClick={e => e.preventDefault()}>
                    Log in
                  </Link> */}
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </form>
          </CardContent>

        {!showAlert && (
          <div>
            <LinearProgress value={progress} />
          </div>
        )}

        {showAlert && (
          <Alert severity="success" onClose={() => setShowAlert(false)}>
            Su inversión ha sido registrada
          </Alert>
        )}
        </>
      ) : (
        <>
          <CardHeader title='Billetera no conectada' />
          <CardContent>
            <Grid container spacing={5}>
              <Grid item xs={12}>
                <Button type='button' variant='contained' onClick={connectToOptimism}>
                  Conectar Billetera
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </>
      )}
    </Card>
  )
}
