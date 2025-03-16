import { useState, useEffect } from 'react';
import axios from 'axios'

import OrdersTable from '../Components/OrdersTable';
import Pagination from '../Components/Pagination/Pagination';

import './Dashboard.css'

function Dashboard () {
  
    const userName = localStorage.getItem("userName");
    const token = localStorage.getItem("token");

    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [totalPages, setTotalPages] = useState(1);
    const [orders, setOrders] = useState([]); // Armazena os pedidos da API
    const [totalOrders, setTotalOrders] = useState("");
    const [amountOrders, setAmountOrders] = useState("");
    const [totalSales, setTotalSales] = useState("");
    const [amountSales, setAmountSales] = useState("");
    const [averageTicket, setAverageTicket] = useState("");

  
    // Função para buscar pedidos do backend
    const fetchOrders = async (pageNumber = 1, pageSize = 5) => {
        try {
            const response = await axios.get("http://localhost:3333/proof/dashboard", {
                params: {
                    page: pageNumber,
                    limit: pageSize, // Envia limite por página
                },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setOrders(response.data.orders || []);
            setTotalPages(response.data.total_pages || 1);
            setCurrentPage(pageNumber);
            setTotalOrders(response.data.orders_count)
            setAmountOrders(response.data.orders_total)
            setTotalSales(response.data.sales_count)
            setAmountSales(response.data.sales_total)
            setAverageTicket(response.data.average_ticket)

        } catch (error) {
            console.error("Erro na requisição:", error.response?.data || error.message);
        }
    };

    // Chamar a API ao carregar a página ou mudar a quantidade de itens
    useEffect(() => {
        fetchOrders(currentPage, pageSize);
    }, [currentPage, pageSize]);

    const formatCurrencyBRL = (value) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(value);
    };
    
    return(
        <div className='container__main__dashboard'>
            <div className='section__menu'>
                <div className='box__logo center'>
                    <svg  className="svg__logo__in__dashboard" width="160" height="68" viewBox="0 0 160 68" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M58.2605 55.1026L59.7724 52.6125C61.551 54.1688 64.6637 55.1916 67.8573 55.1916C72.3484 55.1916 74.7941 53.6352 74.7941 51.0117C74.7941 45.7201 61.543 49.3664 61.543 41.4513C61.543 37.0046 65.545 34.1749 71.6814 34.1749C74.6607 34.1749 77.8178 35.0197 79.5965 36.3537L78.2625 38.8884C76.4394 37.5099 73.8158 36.8671 71.4146 36.8671C67.1013 36.8671 64.6556 38.6013 64.6556 41.136C64.6556 46.5609 77.9068 42.8702 77.9068 50.6519C77.9068 55.2764 73.7714 57.9283 67.546 57.9283C63.7299 57.9485 60.0836 56.7479 58.2605 55.1026Z" fill="#59666F"/>
                        <path d="M106.907 34.3365L102.234 57.7221H99.21L99.9659 53.9869C97.6981 56.6994 94.5409 57.9445 90.9391 57.9445C85.6839 57.9445 82.6238 55.1147 82.6238 50.2961C82.6289 49.4151 82.7182 48.5366 82.8906 47.6726L85.5586 34.3325H88.7158L86.0477 47.6726C85.9124 48.3614 85.838 49.0607 85.8254 49.7625C85.8254 53.142 87.782 55.0986 91.784 55.0986C96.7198 55.0986 100.144 52.3416 101.255 46.9167L103.75 34.3325L106.907 34.3365Z" fill="#59666F"/>
                        <path d="M114.361 34.3366H117.518L112.91 57.7221H109.753L114.361 34.3366ZM115.17 27.1329C115.166 26.8127 115.227 26.495 115.349 26.199C115.471 25.9029 115.651 25.6346 115.88 25.4103C116.108 25.1859 116.38 25.0101 116.678 24.8935C116.976 24.7769 117.295 24.7219 117.615 24.7317C117.891 24.7203 118.167 24.7637 118.426 24.8593C118.685 24.9549 118.923 25.1009 119.125 25.2888C119.328 25.4766 119.491 25.7027 119.606 25.954C119.721 26.2053 119.785 26.4768 119.794 26.7529C119.803 27.0824 119.745 27.4102 119.623 27.7163C119.501 28.0225 119.318 28.3005 119.085 28.5336C118.852 28.7666 118.574 28.9497 118.267 29.0717C117.961 29.1937 117.633 29.252 117.304 29.2431C117.024 29.2479 116.747 29.1968 116.487 29.0928C116.228 28.9888 115.991 28.8339 115.793 28.6373C115.594 28.4408 115.436 28.2064 115.329 27.948C115.222 27.6897 115.168 27.4125 115.17 27.1329Z" fill="#59666F"/>
                        <path d="M125.449 50.6559C125.351 51.1396 125.291 51.6303 125.271 52.1233C125.271 54.1244 126.383 55.236 128.65 55.236C129.951 55.2367 131.217 54.8107 132.252 54.0233L133.008 56.4245C131.541 57.5362 129.584 57.9364 127.805 57.9364C124.293 57.9364 122.114 55.9354 122.114 52.6004C122.109 51.9881 122.168 51.377 122.292 50.7772L125.004 36.9925H120.869L121.358 34.3244H125.538L126.56 29.2107H129.722L128.699 34.3244H135.814L135.28 36.9925H128.165L125.449 50.6559Z" fill="#59666F"/>
                        <path d="M160.001 44.2971C160.001 44.6084 159.956 44.9642 159.956 45.3199L140.035 49.0106C140.48 52.9682 143.103 55.1471 148.039 55.1471C151.152 55.1471 153.953 54.0799 155.687 52.2123L157.11 54.4801C154.931 56.659 151.507 57.9485 147.772 57.9485C141.013 57.9485 136.878 54.1243 136.878 47.9879C136.878 40.1173 142.303 34.1587 149.814 34.1587C155.954 34.1587 160.001 37.716 160.001 44.2971ZM140.035 46.6539L157.066 43.4523C156.977 39.3169 154.131 36.8267 149.729 36.8267C144.348 36.8267 140.48 40.8287 140.035 46.6539Z" fill="#59666F"/>
                        <path d="M19.2946 35.8929C17.2926 34.2542 14.779 33.3701 12.192 33.3947C5.08136 33.3947 0 38.5205 0 45.7201C0 52.9197 5.08136 58.1264 12.192 58.1264C14.7387 58.1528 17.2159 57.2957 19.2016 55.7009V57.3381H26.0738V34.09H19.3189L19.2946 35.8929ZM13.2633 51.044C10.2638 51.044 8.0566 48.7762 8.0566 45.7403C8.0566 42.7044 10.2436 40.4568 13.2633 40.4568C16.283 40.4568 18.4659 42.7246 18.4659 45.7403C18.4659 48.756 16.2628 51.044 13.2633 51.044Z" fill="#59666F"/>
                        <path d="M49.4761 35.4199V34.1142H29.3568V41.1845H38.3957L29.4902 56.1779V57.3664H49.565V50.2436H40.6919L49.4761 35.4199Z" fill="#59666F"/>
                        <path d="M35.6261 8H33.5766L35.6867 10.2355C30.8425 14.4557 24.8077 17.068 18.4153 17.7117C12.0229 18.3554 5.58839 16.9988 0 13.8292C2.29018 17.7981 5.42839 21.2124 9.19057 23.8283C12.9527 26.4442 17.2461 28.1973 21.764 28.9622C26.282 29.7272 30.9131 29.4852 35.3267 28.2536C39.7403 27.022 43.8276 24.8311 47.2966 21.8373L49.4594 23.8787V8H35.6261Z" fill="#FE7C6E"/>
                    </svg>
                </div>
                <div className='box__option__dashboard'>
                    <svg className='svg__option__menu' width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2.75 13V8.5H6.25" stroke="white" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M14.25 13H1.75" stroke="white" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M6.25 13V5.5H9.75" stroke="white" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M13.25 2.5H9.75V13H13.25V2.5Z" stroke="white" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>

                    <p className='name__option__menu'>Dashboard</p>
                </div>
                
            </div>

            <div className='section__content'>
                <div className='header__content'>
                    <div className='box__warnings center'>
                        <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.7194 5.33333C12.7194 4.27247 12.2851 3.25505 11.512 2.5049C10.7389 1.75476 9.69043 1.33333 8.59715 1.33333C7.50387 1.33333 6.45537 1.75476 5.6823 2.5049C4.90923 3.25505 4.47493 4.27247 4.47493 5.33333C4.47493 10 2.41382 11.3333 2.41382 11.3333H14.7805C14.7805 11.3333 12.7194 10 12.7194 5.33333Z" stroke="#59666F" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M9.78584 14C9.66505 14.2021 9.49168 14.3698 9.28308 14.4864C9.07449 14.6029 8.83799 14.6643 8.59727 14.6643C8.35654 14.6643 8.12004 14.6029 7.91145 14.4864C7.70285 14.3698 7.52948 14.2021 7.40869 14" stroke="#59666F" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <p className='text__warnings'>Avisos</p>
                    </div>
                    <div className='box__userName'>
                        <p className='text__hello'>Olá,</p>
                        <p className='text__userName' >{userName}</p>
                    </div>
                    <div className='box__img__profile center'>
                        <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14.663 14V12.6667C14.663 11.9594 14.3735 11.2811 13.8581 10.781C13.3427 10.281 12.6437 10 11.9149 10H6.41856C5.6897 10 4.9907 10.281 4.47532 10.781C3.95995 11.2811 3.67041 11.9594 3.67041 12.6667V14" stroke="white" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M9.16685 7.33333C10.6846 7.33333 11.915 6.13943 11.915 4.66667C11.915 3.19391 10.6846 2 9.16685 2C7.64909 2 6.4187 3.19391 6.4187 4.66667C6.4187 6.13943 7.64909 7.33333 9.16685 7.33333Z" stroke="white" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </div>
                </div>

                <div className='box__text__order'>
                    <p className='text__order'>Resumo dos pedidos</p>
                </div>

                <div className='container__totais'>
                    <div className='box__totais'>
                        <div className='box__svg center' style={{background: '#F4C8E1'}}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M18.75 16.5V5.99999C18.7512 5.70417 18.6939 5.41103 18.5813 5.13749C18.4686 4.86394 18.3029 4.61541 18.0938 4.40623C17.8846 4.19705 17.636 4.03137 17.3625 3.91873C17.089 3.8061 16.7958 3.74875 16.5 3.74999H3.75" stroke="#E54594" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M9.75 9.75H15.75" stroke="#E54594" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M9.75 12.75H15.75" stroke="#E54594" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M2.07187 7.5C1.829 7.22807 1.65585 6.9012 1.56733 6.54751C1.4788 6.19382 1.47756 5.82392 1.56369 5.46964C1.64983 5.11536 1.82077 4.78732 2.0618 4.51376C2.30283 4.2402 2.60673 4.02931 2.94734 3.89924C3.28795 3.76918 3.65507 3.72383 4.01709 3.76711C4.37911 3.81039 4.72519 3.941 5.02554 4.14769C5.32589 4.35439 5.57151 4.63097 5.74126 4.95364C5.91101 5.27632 5.9998 5.63541 6 6V18C6.00019 18.3646 6.08899 18.7237 6.25874 19.0464C6.42849 19.369 6.67411 19.6456 6.97446 19.8523C7.27481 20.059 7.62089 20.1896 7.98291 20.2329C8.34493 20.2762 8.71205 20.2308 9.05266 20.1008C9.39327 19.9707 9.69717 19.7598 9.9382 19.4862C10.1792 19.2127 10.3502 18.8846 10.4363 18.5304C10.5224 18.1761 10.5212 17.8062 10.4327 17.4525C10.3441 17.0988 10.171 16.7719 9.92813 16.5H20.4281C20.7177 16.8238 20.9074 17.2245 20.9743 17.6538C21.0411 18.0831 20.9823 18.5225 20.8048 18.9191C20.6274 19.3156 20.3389 19.6523 19.9743 19.8885C19.6096 20.1246 19.1844 20.2502 18.75 20.25H8.25" stroke="#E54594" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
                        <p className='text__totais'>{totalOrders} Pedidos</p>
                        <p className='values__totais'>{formatCurrencyBRL(amountOrders)}</p>
                    </div>
                    <div className='box__totais'>
                        <div className='box__svg center' style={{background: '#B6EEDD'}}>
                            <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12.3 6.75V8.25" stroke="#07C693" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M12.3 15.75V17.25" stroke="#07C693" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M12.3 21C17.2706 21 21.3 16.9706 21.3 12C21.3 7.02944 17.2706 3 12.3 3C7.32949 3 3.30005 7.02944 3.30005 12C3.30005 16.9706 7.32949 21 12.3 21Z" stroke="#07C693" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M10.05 15.75H13.425C13.9223 15.75 14.3992 15.5525 14.7509 15.2008C15.1025 14.8492 15.3 14.3723 15.3 13.875C15.3 13.3777 15.1025 12.9008 14.7509 12.5492C14.3992 12.1975 13.9223 12 13.425 12H11.175C10.6778 12 10.2009 11.8025 9.84922 11.4508C9.49759 11.0992 9.30005 10.6223 9.30005 10.125C9.30005 9.62772 9.49759 9.15081 9.84922 8.79917C10.2009 8.44754 10.6778 8.25 11.175 8.25H14.55" stroke="#07C693" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
                        <p className='text__totais'>{totalSales} Vendas</p>
                        <p className='values__totais'>{formatCurrencyBRL(amountSales)}</p>
                    </div>
                    <div className='box__totais'>
                        <div className='box__svg center' style={{background: '#C3E7F3'}}>
                            <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4.3501 17.25H10.3501" stroke="#3CB0D9" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M7.3501 14.25V20.25" stroke="#3CB0D9" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M10.3501 6.75H4.3501" stroke="#3CB0D9" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M20.8501 15.7594H14.8501" stroke="#3CB0D9" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M20.8501 18.7406H14.8501" stroke="#3CB0D9" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M20.1001 4.5L15.6001 9" stroke="#3CB0D9" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M20.1001 9L15.6001 4.5" stroke="#3CB0D9" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
                        <p className='text__totais'>Ticket médio</p>
                        <p className='values__totais'>{formatCurrencyBRL(averageTicket)}</p>
                    </div>
                </div>

                <div className='container__table'>
                    <OrdersTable
                        orders={orders}
                    />
                    <Pagination
                        totalPages={totalPages}
                        currentPage={currentPage}
                        onPageChange={fetchOrders} // Atualiza a API quando muda de página
                        onPageSizeChange={(newSize) => {
                            setPageSize(newSize); 
                            setCurrentPage(1); // Reseta para a página 1 ao mudar a quantidade de itens
                        }}
                    />
                </div>
            </div>
            <div className='footer'>
                <div  className='text__links'>
                    <a href="">Termos de Uso</a>
                    <a href="">Política de Privacidade</a>
                </div>
                <div className='box__logo__az'>
                    <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.75359 13.5027C8.7952 12.7357 7.57494 12.293 6.20849 12.293C2.66096 12.293 0.125 14.7744 0.125 18.2611C0.125 21.7599 2.66096 24.2713 6.20849 24.2713C7.55469 24.2713 8.75673 23.8419 9.70635 23.0966V23.8905H13.1409V12.6325H9.76534L9.75359 13.5027ZM6.74343 20.8378C5.24659 20.8378 4.14633 19.7403 4.14633 18.2705C4.14633 16.8093 5.23755 15.7118 6.74343 15.7118C8.24028 15.7118 9.34054 16.8093 9.34054 18.2705C9.34 19.7403 8.2396 20.8378 6.74289 20.8378H6.74343Z" fill="#97A1A8"/>
                        <path d="M24.8128 13.2766V12.644H14.7744V16.0674H19.2847L14.8403 23.3267V23.9021H24.8583V20.4546H20.4307L24.8128 13.2766Z" fill="#97A1A8"/>
                        <path d="M17.9026 0H16.8797L17.9326 1.08297C12.9311 5.33441 5.75207 5.91624 0.125488 2.82203C0.817586 3.98402 1.66619 5.05132 2.6489 5.99574C8.46109 11.5879 17.6761 11.8198 23.7241 6.70069L24.8024 7.6887V6.63952L24.8054 6.64241V0H17.9026Z" fill="#97A1A8"/>
                    </svg>
                    <svg width="144" height="12" viewBox="0 0 144 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4.66201 9.108C4.05401 9.108 3.48201 9 2.94601 8.784C2.41801 8.56 1.95801 8.252 1.56601 7.86C1.17401 7.468 0.866007 7.008 0.642007 6.48C0.426007 5.944 0.318007 5.372 0.318007 4.764C0.318007 4.148 0.426007 3.58 0.642007 3.06C0.866007 2.532 1.17401 2.072 1.56601 1.68C1.95801 1.288 2.41801 0.983999 2.94601 0.767999C3.47401 0.543999 4.04601 0.431999 4.66201 0.431999C5.27801 0.431999 5.85001 0.543999 6.37801 0.767999C6.90601 0.983999 7.36201 1.288 7.74601 1.68C8.13801 2.072 8.44201 2.532 8.65801 3.06C8.88201 3.58 8.99401 4.148 8.99401 4.764C8.99401 5.372 8.88201 5.944 8.65801 6.48C8.44201 7.008 8.13801 7.468 7.74601 7.86C7.35401 8.252 6.89401 8.56 6.36601 8.784C5.84601 9 5.27801 9.108 4.66201 9.108ZM4.66201 8.58C5.19801 8.58 5.69401 8.484 6.15001 8.292C6.61401 8.1 7.01401 7.832 7.35001 7.488C7.69401 7.136 7.96201 6.732 8.15401 6.276C8.34601 5.812 8.44201 5.308 8.44201 4.764C8.44201 4.22 8.34601 3.72 8.15401 3.264C7.96201 2.8 7.69401 2.396 7.35001 2.052C7.01401 1.708 6.61401 1.44 6.15001 1.248C5.69401 1.056 5.19801 0.96 4.66201 0.96C4.11801 0.96 3.61401 1.056 3.15001 1.248C2.69401 1.44 2.29401 1.708 1.95001 2.052C1.61401 2.396 1.35001 2.8 1.15801 3.264C0.966007 3.72 0.870007 4.22 0.870007 4.764C0.870007 5.308 0.966007 5.812 1.15801 6.276C1.35001 6.732 1.61401 7.136 1.95001 7.488C2.29401 7.832 2.69801 8.1 3.16201 8.292C3.62601 8.484 4.12601 8.58 4.66201 8.58ZM2.93401 7.296V2.232H4.98601C5.53001 2.232 5.94601 2.364 6.23401 2.628C6.53001 2.884 6.67801 3.24 6.67801 3.696C6.67801 4.16 6.53001 4.516 6.23401 4.764C5.94601 5.004 5.53801 5.124 5.01001 5.124L5.15401 5.004C5.40201 5.004 5.60601 5.06 5.76601 5.172C5.93401 5.276 6.06601 5.472 6.16201 5.76L6.73801 7.296H5.91001L5.33401 5.736C5.26201 5.536 5.15001 5.404 4.99801 5.34C4.85401 5.268 4.67801 5.232 4.47001 5.232H3.57001L3.72601 5.112V7.296H2.93401ZM3.72601 4.584H4.89001C5.22601 4.584 5.47801 4.516 5.64601 4.38C5.81401 4.244 5.89801 4.028 5.89801 3.732C5.89801 3.436 5.81401 3.22 5.64601 3.084C5.48601 2.948 5.23401 2.88 4.89001 2.88H3.72601V4.584ZM13.6772 9V0.539999H16.5332C17.4532 0.539999 18.2292 0.704 18.8612 1.032C19.5012 1.352 19.9852 1.828 20.3132 2.46C20.6492 3.084 20.8172 3.852 20.8172 4.764C20.8172 5.676 20.6492 6.448 20.3132 7.08C19.9852 7.712 19.5012 8.192 18.8612 8.52C18.2292 8.84 17.4532 9 16.5332 9H13.6772ZM14.6612 8.16H16.4612C17.5732 8.16 18.4012 7.876 18.9452 7.308C19.4972 6.74 19.7732 5.892 19.7732 4.764C19.7732 3.636 19.4972 2.792 18.9452 2.232C18.3932 1.664 17.5652 1.38 16.4612 1.38H14.6612V8.16ZM25.0794 9.108C24.4634 9.108 23.9314 8.988 23.4834 8.748C23.0434 8.5 22.6994 8.152 22.4514 7.704C22.2114 7.256 22.0914 6.72 22.0914 6.096C22.0914 5.488 22.2114 4.96 22.4514 4.512C22.6914 4.056 23.0194 3.7 23.4354 3.444C23.8594 3.188 24.3474 3.06 24.8994 3.06C25.4274 3.06 25.8794 3.176 26.2554 3.408C26.6314 3.64 26.9194 3.968 27.1194 4.392C27.3274 4.816 27.4314 5.324 27.4314 5.916V6.288H22.8354V5.652H26.7834L26.5914 5.808C26.5914 5.168 26.4474 4.672 26.1594 4.32C25.8794 3.96 25.4674 3.78 24.9234 3.78C24.5154 3.78 24.1674 3.876 23.8794 4.068C23.5994 4.252 23.3874 4.512 23.2434 4.848C23.0994 5.176 23.0274 5.56 23.0274 6V6.072C23.0274 6.56 23.1034 6.972 23.2554 7.308C23.4154 7.644 23.6514 7.9 23.9634 8.076C24.2754 8.244 24.6474 8.328 25.0794 8.328C25.4234 8.328 25.7554 8.276 26.0754 8.172C26.4034 8.06 26.7114 7.88 26.9994 7.632L27.3354 8.316C27.0714 8.556 26.7354 8.748 26.3274 8.892C25.9194 9.036 25.5034 9.108 25.0794 9.108ZM30.8062 9.108C30.5022 9.108 30.2062 9.076 29.9182 9.012C29.6382 8.956 29.3742 8.876 29.1262 8.772C28.8862 8.66 28.6782 8.528 28.5022 8.376L28.8142 7.692C29.0062 7.844 29.2142 7.972 29.4382 8.076C29.6622 8.172 29.8902 8.244 30.1222 8.292C30.3542 8.34 30.5902 8.364 30.8302 8.364C31.2862 8.364 31.6302 8.28 31.8622 8.112C32.0942 7.944 32.2102 7.716 32.2102 7.428C32.2102 7.204 32.1342 7.028 31.9822 6.9C31.8302 6.764 31.5902 6.66 31.2622 6.588L30.1702 6.348C29.6662 6.244 29.2902 6.064 29.0422 5.808C28.8022 5.552 28.6822 5.22 28.6822 4.812C28.6822 4.452 28.7742 4.144 28.9582 3.888C29.1502 3.624 29.4182 3.42 29.7622 3.276C30.1062 3.132 30.5062 3.06 30.9622 3.06C31.2342 3.06 31.4942 3.088 31.7422 3.144C31.9902 3.2 32.2222 3.284 32.4382 3.396C32.6622 3.5 32.8542 3.632 33.0142 3.792L32.6902 4.476C32.5382 4.332 32.3662 4.212 32.1742 4.116C31.9822 4.012 31.7822 3.936 31.5742 3.888C31.3742 3.832 31.1702 3.804 30.9622 3.804C30.5142 3.804 30.1742 3.892 29.9422 4.068C29.7102 4.244 29.5942 4.476 29.5942 4.764C29.5942 4.988 29.6662 5.172 29.8102 5.316C29.9542 5.46 30.1782 5.564 30.4822 5.628L31.5742 5.856C32.0942 5.968 32.4822 6.148 32.7382 6.396C33.0022 6.636 33.1342 6.964 33.1342 7.38C33.1342 7.732 33.0382 8.04 32.8462 8.304C32.6542 8.56 32.3822 8.76 32.0302 8.904C31.6862 9.04 31.2782 9.108 30.8062 9.108ZM37.2435 9.108C36.6275 9.108 36.0955 8.988 35.6475 8.748C35.2075 8.5 34.8635 8.152 34.6155 7.704C34.3755 7.256 34.2555 6.72 34.2555 6.096C34.2555 5.488 34.3755 4.96 34.6155 4.512C34.8555 4.056 35.1835 3.7 35.5995 3.444C36.0235 3.188 36.5115 3.06 37.0635 3.06C37.5915 3.06 38.0435 3.176 38.4195 3.408C38.7955 3.64 39.0835 3.968 39.2835 4.392C39.4915 4.816 39.5955 5.324 39.5955 5.916V6.288H34.9995V5.652H38.9475L38.7555 5.808C38.7555 5.168 38.6115 4.672 38.3235 4.32C38.0435 3.96 37.6315 3.78 37.0875 3.78C36.6795 3.78 36.3315 3.876 36.0435 4.068C35.7635 4.252 35.5515 4.512 35.4075 4.848C35.2635 5.176 35.1915 5.56 35.1915 6V6.072C35.1915 6.56 35.2675 6.972 35.4195 7.308C35.5795 7.644 35.8155 7.9 36.1275 8.076C36.4395 8.244 36.8115 8.328 37.2435 8.328C37.5875 8.328 37.9195 8.276 38.2395 8.172C38.5675 8.06 38.8755 7.88 39.1635 7.632L39.4995 8.316C39.2355 8.556 38.8995 8.748 38.4915 8.892C38.0835 9.036 37.6675 9.108 37.2435 9.108ZM41.0022 9V3.168H41.9502V4.464H41.8182C41.9862 4 42.2582 3.652 42.6342 3.42C43.0182 3.18 43.4582 3.06 43.9542 3.06C44.4182 3.06 44.8022 3.144 45.1062 3.312C45.4182 3.472 45.6502 3.724 45.8022 4.068C45.9542 4.412 46.0302 4.844 46.0302 5.364V9H45.0582V5.424C45.0582 5.064 45.0102 4.768 44.9142 4.536C44.8262 4.304 44.6822 4.132 44.4822 4.02C44.2902 3.908 44.0382 3.852 43.7262 3.852C43.3742 3.852 43.0662 3.928 42.8022 4.08C42.5382 4.232 42.3342 4.444 42.1902 4.716C42.0462 4.988 41.9742 5.308 41.9742 5.676V9H41.0022ZM49.4799 9L46.9719 3.168H48.0279L50.1159 8.28H49.7919L51.9159 3.168H52.9119L50.3919 9H49.4799ZM56.2817 9.108C55.7137 9.108 55.2217 8.984 54.8057 8.736C54.3897 8.488 54.0657 8.14 53.8337 7.692C53.6097 7.236 53.4977 6.7 53.4977 6.084C53.4977 5.468 53.6097 4.936 53.8337 4.488C54.0657 4.032 54.3897 3.68 54.8057 3.432C55.2217 3.184 55.7137 3.06 56.2817 3.06C56.8497 3.06 57.3417 3.184 57.7577 3.432C58.1737 3.68 58.4937 4.032 58.7177 4.488C58.9497 4.936 59.0657 5.468 59.0657 6.084C59.0657 6.7 58.9497 7.236 58.7177 7.692C58.4937 8.14 58.1737 8.488 57.7577 8.736C57.3417 8.984 56.8497 9.108 56.2817 9.108ZM56.2817 8.328C56.8337 8.328 57.2697 8.136 57.5897 7.752C57.9177 7.36 58.0817 6.8 58.0817 6.072C58.0817 5.352 57.9177 4.8 57.5897 4.416C57.2697 4.032 56.8337 3.84 56.2817 3.84C55.7377 3.84 55.3017 4.032 54.9737 4.416C54.6457 4.8 54.4817 5.352 54.4817 6.072C54.4817 6.8 54.6457 7.36 54.9737 7.752C55.3017 8.136 55.7377 8.328 56.2817 8.328ZM62.3137 9.108C61.7217 9.108 61.2737 8.932 60.9697 8.58C60.6737 8.228 60.5257 7.724 60.5257 7.068V0.539999H61.4977V6.996C61.4977 7.276 61.5337 7.512 61.6057 7.704C61.6857 7.896 61.8017 8.04 61.9537 8.136C62.1057 8.232 62.2937 8.28 62.5177 8.28C62.6137 8.28 62.7057 8.276 62.7937 8.268C62.8897 8.252 62.9777 8.232 63.0577 8.208L63.0337 9.024C62.9057 9.048 62.7817 9.068 62.6617 9.084C62.5497 9.1 62.4337 9.108 62.3137 9.108ZM65.6635 9L63.1555 3.168H64.2115L66.2995 8.28H65.9755L68.0995 3.168H69.0955L66.5755 9H65.6635ZM70.0033 1.716V0.624H71.2033V1.716H70.0033ZM70.1233 9V3.168H71.0953V9H70.1233ZM75.1324 9.108C74.6124 9.108 74.1564 8.984 73.7644 8.736C73.3804 8.488 73.0804 8.14 72.8644 7.692C72.6564 7.236 72.5524 6.7 72.5524 6.084C72.5524 5.46 72.6564 4.924 72.8644 4.476C73.0804 4.02 73.3804 3.672 73.7644 3.432C74.1564 3.184 74.6124 3.06 75.1324 3.06C75.6604 3.06 76.1124 3.192 76.4884 3.456C76.8644 3.72 77.1164 4.076 77.2444 4.524H77.1124V0.539999H78.0844V9H77.1364V7.608H77.2564C77.1284 8.064 76.8724 8.428 76.4884 8.7C76.1124 8.972 75.6604 9.108 75.1324 9.108ZM75.3364 8.328C75.8884 8.328 76.3244 8.136 76.6444 7.752C76.9724 7.36 77.1364 6.804 77.1364 6.084C77.1364 5.356 76.9724 4.8 76.6444 4.416C76.3244 4.032 75.8884 3.84 75.3364 3.84C74.7924 3.84 74.3564 4.032 74.0284 4.416C73.7004 4.8 73.5364 5.356 73.5364 6.084C73.5364 6.804 73.7004 7.36 74.0284 7.752C74.3564 8.136 74.7924 8.328 75.3364 8.328ZM82.3325 9.108C81.7645 9.108 81.2725 8.984 80.8565 8.736C80.4405 8.488 80.1165 8.14 79.8845 7.692C79.6605 7.236 79.5485 6.7 79.5485 6.084C79.5485 5.468 79.6605 4.936 79.8845 4.488C80.1165 4.032 80.4405 3.68 80.8565 3.432C81.2725 3.184 81.7645 3.06 82.3325 3.06C82.9005 3.06 83.3925 3.184 83.8085 3.432C84.2245 3.68 84.5445 4.032 84.7685 4.488C85.0005 4.936 85.1165 5.468 85.1165 6.084C85.1165 6.7 85.0005 7.236 84.7685 7.692C84.5445 8.14 84.2245 8.488 83.8085 8.736C83.3925 8.984 82.9005 9.108 82.3325 9.108ZM82.3325 8.328C82.8845 8.328 83.3205 8.136 83.6405 7.752C83.9685 7.36 84.1325 6.8 84.1325 6.072C84.1325 5.352 83.9685 4.8 83.6405 4.416C83.3205 4.032 82.8845 3.84 82.3325 3.84C81.7885 3.84 81.3525 4.032 81.0245 4.416C80.6965 4.8 80.5325 5.352 80.5325 6.072C80.5325 6.8 80.6965 7.36 81.0245 7.752C81.3525 8.136 81.7885 8.328 82.3325 8.328ZM89.6585 11.16V3.168H90.6065V4.548H90.4865C90.6145 4.092 90.8665 3.732 91.2425 3.468C91.6265 3.196 92.0825 3.06 92.6105 3.06C93.1305 3.06 93.5825 3.184 93.9665 3.432C94.3585 3.672 94.6585 4.02 94.8665 4.476C95.0825 4.924 95.1905 5.46 95.1905 6.084C95.1905 6.7 95.0825 7.236 94.8665 7.692C94.6585 8.14 94.3625 8.488 93.9785 8.736C93.5945 8.984 93.1385 9.108 92.6105 9.108C92.0825 9.108 91.6305 8.976 91.2545 8.712C90.8785 8.44 90.6225 8.08 90.4865 7.632H90.6305V11.16H89.6585ZM92.4065 8.328C92.9585 8.328 93.3945 8.136 93.7145 7.752C94.0425 7.36 94.2065 6.804 94.2065 6.084C94.2065 5.356 94.0425 4.8 93.7145 4.416C93.3945 4.032 92.9585 3.84 92.4065 3.84C91.8625 3.84 91.4265 4.032 91.0985 4.416C90.7705 4.8 90.6065 5.356 90.6065 6.084C90.6065 6.804 90.7705 7.36 91.0985 7.752C91.4265 8.136 91.8625 8.328 92.4065 8.328ZM99.0786 9.108C98.5106 9.108 98.0186 8.984 97.6026 8.736C97.1866 8.488 96.8626 8.14 96.6306 7.692C96.4066 7.236 96.2946 6.7 96.2946 6.084C96.2946 5.468 96.4066 4.936 96.6306 4.488C96.8626 4.032 97.1866 3.68 97.6026 3.432C98.0186 3.184 98.5106 3.06 99.0786 3.06C99.6466 3.06 100.139 3.184 100.555 3.432C100.971 3.68 101.291 4.032 101.515 4.488C101.747 4.936 101.863 5.468 101.863 6.084C101.863 6.7 101.747 7.236 101.515 7.692C101.291 8.14 100.971 8.488 100.555 8.736C100.139 8.984 99.6466 9.108 99.0786 9.108ZM99.0786 8.328C99.6306 8.328 100.067 8.136 100.387 7.752C100.715 7.36 100.879 6.8 100.879 6.072C100.879 5.352 100.715 4.8 100.387 4.416C100.067 4.032 99.6306 3.84 99.0786 3.84C98.5346 3.84 98.0986 4.032 97.7706 4.416C97.4426 4.8 97.2786 5.352 97.2786 6.072C97.2786 6.8 97.4426 7.36 97.7706 7.752C98.0986 8.136 98.5346 8.328 99.0786 8.328ZM103.323 9V3.168H104.271V4.548H104.151C104.287 4.076 104.523 3.72 104.859 3.48C105.195 3.232 105.639 3.088 106.191 3.048L106.539 3.012L106.611 3.852L105.999 3.924C105.455 3.972 105.035 4.148 104.739 4.452C104.451 4.748 104.307 5.156 104.307 5.676V9H103.323ZM110.021 9L113.753 0.539999H114.593L118.325 9H117.305L116.261 6.588L116.741 6.84H111.581L112.073 6.588L111.041 9H110.021ZM114.161 1.692L112.229 6.24L111.941 6.012H116.381L116.117 6.24L114.185 1.692H114.161ZM119.196 9V8.352L122.712 3.672V3.924H119.196V3.168H123.612V3.816L120.06 8.52V8.244H123.744V9H119.196ZM126.78 9.108C126.38 9.108 126.02 9.032 125.7 8.88C125.388 8.72 125.14 8.504 124.956 8.232C124.772 7.96 124.68 7.656 124.68 7.32C124.68 6.888 124.788 6.548 125.004 6.3C125.228 6.052 125.592 5.876 126.096 5.772C126.608 5.668 127.304 5.616 128.184 5.616H128.724V6.252H128.196C127.708 6.252 127.3 6.268 126.972 6.3C126.644 6.332 126.384 6.388 126.192 6.468C126 6.548 125.864 6.652 125.784 6.78C125.704 6.908 125.664 7.068 125.664 7.26C125.664 7.588 125.776 7.856 126 8.064C126.232 8.272 126.544 8.376 126.936 8.376C127.256 8.376 127.536 8.3 127.776 8.148C128.024 7.996 128.216 7.788 128.352 7.524C128.496 7.26 128.568 6.956 128.568 6.612V5.244C128.568 4.748 128.468 4.392 128.268 4.176C128.068 3.952 127.74 3.84 127.284 3.84C126.932 3.84 126.592 3.892 126.264 3.996C125.936 4.092 125.6 4.252 125.256 4.476L124.92 3.768C125.128 3.624 125.364 3.5 125.628 3.396C125.892 3.284 126.168 3.2 126.456 3.144C126.744 3.088 127.02 3.06 127.284 3.06C127.788 3.06 128.204 3.144 128.532 3.312C128.86 3.472 129.104 3.72 129.264 4.056C129.424 4.384 129.504 4.808 129.504 5.328V9H128.592V7.644H128.7C128.636 7.948 128.512 8.208 128.328 8.424C128.152 8.64 127.932 8.808 127.668 8.928C127.404 9.048 127.108 9.108 126.78 9.108ZM131.307 11.16V3.168H132.255V4.548H132.135C132.263 4.092 132.515 3.732 132.891 3.468C133.275 3.196 133.731 3.06 134.259 3.06C134.779 3.06 135.231 3.184 135.615 3.432C136.007 3.672 136.307 4.02 136.515 4.476C136.731 4.924 136.839 5.46 136.839 6.084C136.839 6.7 136.731 7.236 136.515 7.692C136.307 8.14 136.011 8.488 135.627 8.736C135.243 8.984 134.787 9.108 134.259 9.108C133.731 9.108 133.279 8.976 132.903 8.712C132.527 8.44 132.271 8.08 132.135 7.632H132.279V11.16H131.307ZM134.055 8.328C134.607 8.328 135.043 8.136 135.363 7.752C135.691 7.36 135.855 6.804 135.855 6.084C135.855 5.356 135.691 4.8 135.363 4.416C135.043 4.032 134.607 3.84 134.055 3.84C133.511 3.84 133.075 4.032 132.747 4.416C132.419 4.8 132.255 5.356 132.255 6.084C132.255 6.804 132.419 7.36 132.747 7.752C133.075 8.136 133.511 8.328 134.055 8.328ZM140.931 9.108C140.315 9.108 139.783 8.988 139.335 8.748C138.895 8.5 138.551 8.152 138.303 7.704C138.063 7.256 137.943 6.72 137.943 6.096C137.943 5.488 138.063 4.96 138.303 4.512C138.543 4.056 138.871 3.7 139.287 3.444C139.711 3.188 140.199 3.06 140.751 3.06C141.279 3.06 141.731 3.176 142.107 3.408C142.483 3.64 142.771 3.968 142.971 4.392C143.179 4.816 143.283 5.324 143.283 5.916V6.288H138.687V5.652H142.635L142.443 5.808C142.443 5.168 142.299 4.672 142.011 4.32C141.731 3.96 141.319 3.78 140.775 3.78C140.367 3.78 140.019 3.876 139.731 4.068C139.451 4.252 139.239 4.512 139.095 4.848C138.951 5.176 138.879 5.56 138.879 6V6.072C138.879 6.56 138.955 6.972 139.107 7.308C139.267 7.644 139.503 7.9 139.815 8.076C140.127 8.244 140.499 8.328 140.931 8.328C141.275 8.328 141.607 8.276 141.927 8.172C142.255 8.06 142.563 7.88 142.851 7.632L143.187 8.316C142.923 8.556 142.587 8.748 142.179 8.892C141.771 9.036 141.355 9.108 140.931 9.108Z" fill="#97A1A8"/>
                    </svg>
                </div>
            </div>
        </div>
    )
}
export default Dashboard;