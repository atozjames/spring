package first.sample.controller;

import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import first.common.common.CommandMap;
import first.sample.service.SampleService;

@Controller
public class SampleController {
   
 Logger log = LoggerFactory.getLogger(this.getClass());
	
 @Resource(name="sampleService")  //스동으로 사용할 빈을 등록
 
 private SampleService sampleService;

 @RequestMapping(value="/sample/openBoardList.do")
 public ModelAndView openSampleBoardList(Map<String,Object> commandMap) throws Exception{
     
	/* ModelAndView mv = new ModelAndView("/sample/boardList"); */// mv.setViewName("/sample/boardList"); 같은내용
     
	 ModelAndView mv = new ModelAndView();
	 
     List<Map<String,Object>> list = sampleService.selectBoardList(commandMap);
     
     mv.addObject("list", list);
     mv.setViewName("/sample/boardList");
      
     return mv;
 }
 
 @RequestMapping(value="/sample/testMapArgumentResolver.do")
 public ModelAndView testMapArgumentResolver(CommandMap commandMap) throws Exception{
     ModelAndView mv = new ModelAndView("");
      
     if(commandMap.isEmpty() == false){
         Iterator<Entry<String,Object>> iterator = commandMap.getMap().entrySet().iterator();
         Entry<String,Object> entry = null;
         while(iterator.hasNext()){
             entry = iterator.next();
             log.debug("key : "+entry.getKey()+", value : "+entry.getValue());
         }
     }
     return mv;
 }

 @RequestMapping(value="/sample/openBoardWrite.do")
 public ModelAndView openBoardWrite(CommandMap commandMap) throws Exception{
     ModelAndView mv = new ModelAndView("/sample/boardWrite");
    
     return mv;
 }


 @RequestMapping(value="/sample/insertBoard.do")
 public ModelAndView insertBoard(CommandMap commandMap) throws Exception{
     ModelAndView mv = new ModelAndView("redirect:/sample/openBoardList.do");
      
   
      
     if(commandMap.isEmpty() == false){
         Iterator<Entry<String,Object>> iterator = commandMap.getMap().entrySet().iterator();
         Entry<String,Object> entry = null;
         while(iterator.hasNext()){
             entry = iterator.next();
             log.debug("key : "+entry.getKey()+", value : "+entry.getValue());
         }
     }
   
      sampleService.insertBoard(commandMap.getMap());
     
     return mv;
 }


 
 

 @RequestMapping(value="/mcSale/getCustomList.do")
 public ModelAndView getCustonList(Map<String,Object> commandMap) throws Exception{
     
		 ModelAndView mv = new ModelAndView();
		 
	     List<Map<String,Object>> list = sampleService.selectCustomList(commandMap);
	     
	     mv.addObject("list", list);
	    
	     
	     mv.setViewName("jsonView");
	     
	      
	     return mv;
	 }

 
	
}

