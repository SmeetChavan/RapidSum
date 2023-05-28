import { useEffect, useState } from 'react';
import { useLazyGetSummaryQuery } from '../services/article';
import { LinearProgress , Stack} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DoneIcon from '@mui/icons-material/Done';
import LinkIcon from '@mui/icons-material/Link';

const Demo = () => {

  const [article , setArticle] = useState({
    url: '',
    summary: '',
  });

  const [allArticles , setAllArticles] = useState([]);
  const [copied , setCopied] = useState("");

  const [getSummary , {error , isFetching}] = useLazyGetSummaryQuery();

  const handleCopy = (copyUrl) => {

    setCopied(copyUrl);
    navigator.clipboard.writeText(copyUrl);

    setTimeout(() => {
      setCopied(false);
    }, 3000);
  }

  const handleSubmit = async (e) => {

    e.preventDefault();

    const {data} = await getSummary({
      articleUrl: article.url
    });

    if(data?.summary){

      const newArticle = {...article , summary: data.summary};
      setArticle(newArticle);

      let exists = false;
      for(let i = 0 ; i < allArticles.length ; ++i){
        
        if(allArticles[i].url === newArticle.url){
          exists = true;
          break;
        }
      }

      if(!exists) {

        const updatedAllArticles = [newArticle, ...allArticles];
        setAllArticles(updatedAllArticles);

        localStorage.setItem("articles" , JSON.stringify(updatedAllArticles));
        // console.log(updatedAllArticles);
      }

      // console.log(newArticle);
    }
  }

  useEffect(() => {

    const articlesFromLocalStorage = JSON.parse(localStorage.getItem("articles"));

    if(articlesFromLocalStorage){
      setAllArticles(articlesFromLocalStorage);
    }

  }, [])


  return (
    <section className="w-full mt-16 max-w-xl ">

      <div className="flex flex-col w-full gap-2">

        <form className='relative flex justify-center items-center' onSubmit={handleSubmit}>

          <LinkIcon className='absolute left-0 my-2 ml-3 w-5'/>

          <input type="url" value={article.url} placeholder='Enter a URL' required onChange={(e) => {setArticle({...article , url: e.target.value})}} className='url_input peer focus:border-gray-400' />

          <button type='submit' className='submit_btn peer-focus:border-gray-200 peer-focus: text-gray-700 hover:border-gray-400'>✔</button>

        </form>

        <div className='flex flex-col gap-1 max-h-60 overflow-y-auto'>

          {allArticles.map((item , index) => (

            <div key={`link-${index}`} className='link_card'>

              <div className="copy_btn" onClick={() => handleCopy(item.url)}>

                {
                  copied === item.url ? 
                  <DoneIcon style={{fontSize: "16px"}}/>
                  :
                  <ContentCopyIcon style={{fontSize: "16px"}} onClick={handleCopy}/>
                }

              </div>

              <p className='flex-1 font-satoshi text-gray-600 font-medium text-sm truncate' onClick={() => setArticle(item)}>
                {item.url}
              </p>

            </div>

          ))}
        </div>
      </div>

      <div className='my-10 max-w-full flex justify-center items-center'>

        {isFetching ? (

          <Stack sx={{ width: '100%', color: 'grey.500' }} spacing={2}>
            <LinearProgress color="success" />
            <p className='text-center font-bold'>Give me 20-30 seconds to process the text.</p>
          </Stack>

        ) : error ? (

          <p className='font-inter font-bold text-black text-center'>
            Well that wasn't supposed to happen...
            <br/>
            <span className='font-satoshi font-normal text-gray-700'>{error?.data?.error}</span>
          </p>
        ) : (
          article.summary && (
            <div className='flex flex-col gap-3'>

              <h2 className='font-satoshi font-bold text-gray-600 text-xl'>
                Article <span className='blue_gradient'>Summary</span>
              </h2>

              <div className="summary_box">
                <p>
                  {article.summary}
                </p>
              </div>

            </div>
          )
        )
        
        }

      </div>

    </section>
  )
}
  
export default Demo;