package com.teameverest.paymyfee;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.RelativeLayout;

/**
 * Created by harishannam on 28/11/15.
 */
public class HomeScreen extends AppCompatActivity {




    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.home_screen);
        RelativeLayout add_student = (RelativeLayout) findViewById(R.id.student_add);
        RelativeLayout view_student = (RelativeLayout) findViewById(R.id.student_search);

        add_student.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent = new Intent(getApplicationContext(), AddStudent.class);
                HomeScreen.this.startActivity(intent);
            }
        });
        view_student.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
               // displayFragment();
                //Toast.makeText(getApplicationContext(), "Open Students list fragment", Toast.LENGTH_LONG).show();
            }
        });
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.menu_main, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem menuItem) {
        switch (menuItem.getItemId()) {
            case android.R.id.home:
                finish();
        }
        return (super.onOptionsItemSelected(menuItem));
    }


}
