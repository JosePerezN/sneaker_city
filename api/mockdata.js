// genera un timestamp aleatorio entre el 01/01/2021 y la fecha actual + 3 meses
const generaFecha = () => {
    var fechaInicio = new Date(2021, 1, 1);    
    var fechaFin = new Date(Date.now() + (86400*1000*90)); //86400*1000 = 24 Horas * 90 dias => 3 meses
    return (new Date(fechaInicio.getTime() + Math.random() * (fechaFin.getTime() - fechaInicio.getTime()))).getTime();
}

// MockData de los items disponibles
module.exports = {
    items: [
        {
            id: '1',
            name: 'Adidas',
            model: 'AdiPower Howard 2',
            price: 100,
            releaseDate: generaFecha(),            
            picture: 'https://images.solecollector.com/complex/image/upload/c_fill,f_auto,fl_lossy,q_auto,w_1100/hhnusv9z39rud9bnls3s.jpg'
        },
        {
            id:'2',
            name: 'Adidas',
            model: 'Crazy BYW',
            price: 220,
            releaseDate: generaFecha(),            
            picture: 'https://images.solecollector.com/complex/image/upload/c_fill,f_auto,fl_lossy,q_auto,w_1100/qjw4rw0c8sc3wlott3t0.jpg'
        },
        {
            id:'3',
            name: 'Adidas',
            model: 'EQT Support Ultra',
            price: 200,
            releaseDate: generaFecha(),            
            picture: 'https://images.solecollector.com/complex/image/upload/c_fill,f_auto,fl_lossy,q_auto,w_1100/ow3kgs2w1agzsmgvzijk.jpg'
        },
        {
            id:'4',
            name: 'Adidas',
            model: 'D.O.N. Issue #1',
            price: 100,
            releaseDate: generaFecha(),            
            picture: 'https://images.solecollector.com/complex/image/upload/c_fill,f_auto,fl_lossy,q_auto,w_1100/wk55kju9inlej4btda9f.jpg'
        },
        {
            id:'5',
            name: 'Nike',
            model: 'Air Tech Challenge 2 (II)',
            price: 130,
            releaseDate: generaFecha(),            
            picture: 'https://images.solecollector.com/complex/image/upload/c_fill,f_auto,fl_lossy,q_auto,w_1100/nike-air-tech-challenge-2-hot-lava_lfj5vg.jpg'
        },
        {
            id:'6',
            name: 'Nike',
            model: 'Air Flare',
            price: 130,
            releaseDate: generaFecha(),            
            picture: 'https://images.solecollector.com/complex/image/upload/c_fill,f_auto,fl_lossy,q_auto,w_1100/nike-air-flare-model_yzggcq.jpg'
        },
        {
            id:'7',
            name: 'Nike',
            model: 'Air Force 1 High',
            price: 200,
            releaseDate: generaFecha(),            
            picture: 'https://images.solecollector.com/complex/image/upload/c_fill,f_auto,fl_lossy,q_auto,w_1100/nike-air-force-1-high_mymvol.jpg'
        },
        {
            id:'8',
            name: 'Nike',
            model: 'Air Max 1',
            price: 150,
            releaseDate: generaFecha(),            
            picture: 'https://images.solecollector.com/complex/image/upload/c_fill,f_auto,fl_lossy,q_auto,w_1100/nike-air-max-1-model-image_kx3ybw.jpg'
        },
        {
            id: '9',
            name: 'Converse',
            model: 'Aero Jam',
            price: 110,
            releaseDate: generaFecha(),            
            picture: 'https://sneakernews.com/wp-content/uploads/2019/08/converse-aero-jam-2019-release-info-9.jpg'
        },
        {
            id: '10',
            name: 'Converse',
            model: 'All Star Pro BB',
            price: 140,
            releaseDate: generaFecha(),            
            picture: 'https://images.solecollector.com/complex/image/upload/c_fill,f_auto,fl_lossy,q_auto,w_1100/tzifcjbeoufgr09qyfox.jpg'
        },
        {
            id: '11',
            name: 'Jordan',
            model: 'Air Jordan 1 Mid "Quai 54"',
            price: 140,
            releaseDate: generaFecha(),            
            picture: 'https://images.solecollector.com/complex/image/upload/c_fill,f_auto,fl_lossy,q_auto,w_1100/kkaugnp5dwxkrv5klujs.jpg'
        },
        {
            id: '12',
            name: 'Jordan',
            model: 'Air Jordan 10 (X)',
            price: 190,
            releaseDate: generaFecha(),            
            picture: 'https://images.solecollector.com/complex/image/upload/c_fill,f_auto,fl_lossy,q_auto,w_1100/air-jordan-10-retro-og-hero_tlrkaf.jpg'
        }
    ],

    item_sizes: {
        '1': [
            {
                size: '7',
                qty: 34 
            },
            {
                size: '7.5',
                qty: 20 
            },
            {
                size: '8',
                qty: 13 
            },
            {
                size: '8.5',
                qty: 17 
            },
            {
                size: '9',
                qty: 10 
            }
        ],
        '2': [
            {
                size: '7',
                qty: 22 
            },
            {
                size: '10.5',
                qty: 6 
            },
            {
                size: '11',
                qty: 7 
            }
        ],
        '3': [
            {
                size: '7',
                qty: 12 
            },
            {
                size: '7.5',
                qty: 18 
            },
            {
                size: '10',
                qty: 10 
            }
        ],
        '4': [
            {
                size: '6',
                qty: 44 
            },
            {
                size: '7.5',
                qty: 33 
            },
            {
                size: '8',
                qty: 11 
            },
            {
                size: '8.5',
                qty: 7 
            },
            {
                size: '9',
                qty: 5 
            }
        ],
        '5': [
            {
                size: '9',
                qty: 34 
            },
            {
                size: '9.5',
                qty: 2 
            },
            {
                size: '10',
                qty: 14 
            }
        ],
        '6': [
            {
                size: '12',
                qty: 34 
            },
            {
                size: '12.5',
                qty: 20 
            },
            {
                size: '13',
                qty: 13 
            }
        ],
        '7': [
            {
                size: '9.5',
                qty: 45 
            },
            {
                size: '10.5',
                qty: 11 
            }
        ],
        '8': [
            {
                size: '11',
                qty: 19 
            },
            {
                size: '12',
                qty: 20 
            },
            {
                size: '12.5',
                qty: 3 
            },
            {
                size: '13',
                qty: 10 
            },
            {
                size: '14',
                qty: 26 
            },
            {
                size: '15.5',
                qty: 31
            }
        ],
        '9': [
            {
                size: '9',
                qty: 34 
            },
            {
                size: '9.5',
                qty: 20 
            },
            {
                size: '13',
                qty: 13 
            }
        ],
        '10': [
            {
                size: '14',
                qty: 17 
            },
            {
                size: '15',
                qty: 11 
            },
            {
                size: '16',
                qty: 15 
            }
        ],
        '11': [
            {
                size: '17',
                qty: 54 
            },
        ],
        '12': [
            {
                size: '8',
                qty: 13 
            },
            {
                size: '9.5',
                qty: 64 
            },
            {
                size: '11.5',
                qty: 3 
            }
        ]
    }
}