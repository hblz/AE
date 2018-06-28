package com.nd.im.ent;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;

import org.junit.Test;

public class DemoTest {

    @Test
    public void test() throws IllegalAccessException, IllegalArgumentException, InvocationTargetException {
        Demo demo = new Demo();
        Method[] methods = Demo.class.getDeclaredMethods();
        for (Method method : methods)
        {
            method.setAccessible(true);
            method.invoke(demo);
        }        
    }

}
